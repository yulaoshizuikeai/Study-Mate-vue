/**
 * StudyMate 高中版 - 做题进度持久化存储管理器
 * 支持客户端安全的 localStorage 读写、稳定 ID 生成与事件同步
 */

export interface BaseRecord {
  id: string
  path: string
  updatedAt: number
}

export interface QuizRecord extends BaseRecord {
  type: 'quiz'
  selected: number | null
  isCorrect: boolean
  errorType: string
}

export interface StepScoreRecord extends BaseRecord {
  type: 'step'
  isOpen: boolean
  checkedItems: number[]
  score: number
  totalPoints: number
}

export type PracticeRecord = QuizRecord | StepScoreRecord

const STORAGE_KEY = 'sm_practice_records'
const STORAGE_EVENT = 'sm_practice_updated'

// 简单的字符串哈希函数（FNV-1a 32-bit）
function stringHash(str: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
  }
  return (hash >>> 0).toString(36)
}

/**
 * 获取或生成唯一的题目持久化 key
 */
export function generateProblemId(path: string, explicitId?: string, textSnippet?: string): string {
  if (explicitId && explicitId.trim()) {
    return explicitId.trim()
  }
  const cleanPath = (path || 'root').replace(/\/$/, '') || '/'
  const pathHash = stringHash(cleanPath)
  const textHash = stringHash((textSnippet || 'default_problem').trim().slice(0, 100))
  return `prob_${pathHash}_${textHash}`
}

/**
 * 安全获取全量做题记录字典
 */
export function getAllRecords(): Record<string, PracticeRecord> {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {}
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) || {}
  } catch (e) {
    console.warn('[StudyMate Storage] Failed to read records:', e)
    return {}
  }
}

/**
 * 保存或更新单题记录
 */
export function saveRecord(record: PracticeRecord): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return
  }
  try {
    const records = getAllRecords()
    records[record.id] = {
      ...record,
      updatedAt: Date.now()
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: record }))
  } catch (e) {
    console.warn('[StudyMate Storage] Failed to save record:', e)
  }
}

/**
 * 读取单题选择题记录
 */
export function getQuizRecord(id: string): QuizRecord | null {
  const records = getAllRecords()
  const rec = records[id]
  if (rec && rec.type === 'quiz') {
    return rec as QuizRecord
  }
  return null
}

/**
 * 重置/清除单道题目的进度
 */
export function removeRecord(id: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return
  }
  try {
    const records = getAllRecords()
    if (records[id]) {
      delete records[id]
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
      window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { id, reset: true } }))
    }
  } catch (e) {
    console.warn('[StudyMate Storage] Failed to remove record:', e)
  }
}

/**
 * 读取单道踩分大题记录
 */
export function getStepRecord(id: string): StepScoreRecord | null {
  const records = getAllRecords()
  const rec = records[id]
  if (rec && rec.type === 'step') {
    return rec as StepScoreRecord
  }
  return null
}

/**
 * 监听做题数据变更
 */
export function onPracticeUpdated(callback: (detail: any) => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const handler = (e: Event) => {
    callback((e as CustomEvent).detail)
  }
  window.addEventListener(STORAGE_EVENT, handler)
  return () => {
    window.removeEventListener(STORAGE_EVENT, handler)
  }
}
