# StudyMate-HighSchool (高中版) - Google Antigravity 一键安装注册脚本 (PowerShell)
# 作用：将高中自学套件与 Skills 注册到 Antigravity 全局环境与当前工作区
param(
    [string]$Workspace = ""
)
$ErrorActionPreference = 'Stop'

$Root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🎓 正在安装 StudyMate-HighSchool (高中学霸版) 到 Antigravity..." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. 确定技能源目录
$SkillsSrc = Join-Path $Root "skills"
if (-not (Test-Path -LiteralPath $SkillsSrc)) {
    throw "找不到技能目录: $SkillsSrc"
}

# 2. 注册到 Antigravity 全局技能目录 (~/.gemini/config/skills/)
$AgySkillsBase = Join-Path $env:USERPROFILE ".gemini\config\skills"
if (-not (Test-Path -LiteralPath $AgySkillsBase)) {
    New-Item -ItemType Directory -Path $AgySkillsBase -Force | Out-Null
}

Get-ChildItem -LiteralPath $SkillsSrc -Directory | ForEach-Object {
    $skillName = $_.Name
    $destSkillDir = Join-Path $AgySkillsBase $skillName
    if (-not (Test-Path -LiteralPath $destSkillDir)) {
        New-Item -ItemType Directory -Path $destSkillDir -Force | Out-Null
    }
    Copy-Item (Join-Path $_.FullName "*") $destSkillDir -Recurse -Force
}
Write-Host "✅ 已将 12 个高中自学技能注册到 Antigravity 全局技能库: $AgySkillsBase" -ForegroundColor Green

# 3. 建立或更新学习工作区 (默认 StudyMate-HighSchool\workspace)
if (-not $Workspace) {
    $Workspace = Join-Path $Root "workspace"
}
if (-not (Test-Path -LiteralPath $Workspace)) {
    New-Item -ItemType Directory -Path $Workspace -Force | Out-Null
}
$LearningDir = Join-Path $Workspace ".learning"
if (-not (Test-Path -LiteralPath $LearningDir)) {
    New-Item -ItemType Directory -Path $LearningDir -Force | Out-Null
}
$SubjectsDir = Join-Path $LearningDir "subjects"
if (-not (Test-Path -LiteralPath $SubjectsDir)) {
    New-Item -ItemType Directory -Path $SubjectsDir -Force | Out-Null
}
$GlobalMemory = Join-Path $LearningDir "MEMORY.md"
if (-not (Test-Path -LiteralPath $GlobalMemory)) {
    Copy-Item (Join-Path $Root "templates\MEMORY.md") $GlobalMemory -Force
}

# 4. 写入配置到 ~/.dsh 与 ~/.gemini/antigravity/
$PosixWs = $Workspace -replace '\\', '/'
$PosixRoot = $Root -replace '\\', '/'
$ConfigYaml = @"
workspace: "$PosixWs"
root: "$PosixRoot"
"@

$DshDir = Join-Path $env:USERPROFILE ".dsh"
if (-not (Test-Path $DshDir)) { New-Item -ItemType Directory -Path $DshDir -Force | Out-Null }
[System.IO.File]::WriteAllText((Join-Path $DshDir "studymate-config.yaml"), $ConfigYaml, [System.Text.Encoding]::UTF8)

$AgyDir = Join-Path $env:USERPROFILE ".gemini\antigravity"
if (-not (Test-Path $AgyDir)) { New-Item -ItemType Directory -Path $AgyDir -Force | Out-Null }
[System.IO.File]::WriteAllText((Join-Path $AgyDir "studymate-config.yaml"), $ConfigYaml, [System.Text.Encoding]::UTF8)

# 5. 链接/同步到本工作区的 .agents/skills
$LocalAgySkills = Join-Path $Root ".agents\skills"
if (-not (Test-Path $LocalAgySkills)) { New-Item -ItemType Directory -Path $LocalAgySkills -Force | Out-Null }
Get-ChildItem -LiteralPath $SkillsSrc -Directory | ForEach-Object {
    $dest = Join-Path $LocalAgySkills $_.Name
    if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }
    Copy-Item (Join-Path $_.FullName "*") $dest -Recurse -Force
}

# 6. 同步考纲与课件至 VitePress 站点
& py -3 (Join-Path $Root "scripts\sync_to_vitepress.py") | Out-Null

Write-Host "✅ 学习工作区已就绪: $Workspace" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🎉 安装完成！在 Antigravity 中开启高中自学的方式：" -ForegroundColor Yellow
Write-Host "👉 在当前或任意 Antigravity 对话框中直接说：" -ForegroundColor White
Write-Host "   『我想学高中物理动力学』 或 『考考我牛顿运动定律』" -ForegroundColor White
Write-Host "👉 运行本地离线 Web 知识库看板：" -ForegroundColor White
Write-Host "   npm run dev  (自动在浏览器打开路线图与课件)" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
