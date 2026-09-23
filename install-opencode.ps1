# StudyMate-HighSchool (高中版) - OpenCode 一键安装脚本 (PowerShell)
param(
    [string]$Workspace = ""
)
$ErrorActionPreference = 'Stop'

$Root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🤖 正在安装 StudyMate-HighSchool (高中学霸版) 到 OpenCode..." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. 确定全局 OpenCode 配置目录 (~/.config/opencode/)
$OpenCodeHome = Join-Path $env:USERPROFILE ".config\opencode"
$GlobalSkills = Join-Path $OpenCodeHome "skills"
$GlobalCommands = Join-Path $OpenCodeHome "commands"

if (-not (Test-Path -LiteralPath $GlobalSkills)) { New-Item -ItemType Directory -Path $GlobalSkills -Force | Out-Null }
if (-not (Test-Path -LiteralPath $GlobalCommands)) { New-Item -ItemType Directory -Path $GlobalCommands -Force | Out-Null }

# 2. 复制 Skills 到全局
$SkillsSrc = Join-Path $Root "skills"
Get-ChildItem -LiteralPath $SkillsSrc -Directory | ForEach-Object {
    $dest = Join-Path $GlobalSkills $_.Name
    if (-not (Test-Path -LiteralPath $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }
    Copy-Item (Join-Path $_.FullName "*") $dest -Recurse -Force
}
Write-Host "✅ 已将高中自学技能安装到 OpenCode 全局目录: $GlobalSkills" -ForegroundColor Green

# 3. 复制 Commands 到全局
$CmdsSrc = Join-Path $Root ".opencode\commands"
if (Test-Path -LiteralPath $CmdsSrc) {
    Copy-Item (Join-Path $CmdsSrc "*") $GlobalCommands -Recurse -Force
    Write-Host "✅ 已将 /study, /quiz, /mistakes, /roadmap 指令安装到 OpenCode" -ForegroundColor Green
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🎉 安装完成！在 OpenCode 终端中可直接使用以下指令：" -ForegroundColor Yellow
Write-Host "   /study 高中物理 动力学应用" -ForegroundColor White
Write-Host "   /quiz 牛顿第二定律" -ForegroundColor White
Write-Host "   /mistakes" -ForegroundColor White
Write-Host "   /roadmap" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
