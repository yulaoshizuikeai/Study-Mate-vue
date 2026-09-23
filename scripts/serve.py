#!/usr/bin/env python3
"""StudyMate-HighSchool 本地极速 Web 预览服务器。

用法：
    python scripts/serve.py [--port 3000] [--workspace <目录>] [--no-browser]

功能：
    - 读取学习工作区（优先使用参数，次选配置，保底使用 workspace/ 或当前目录）
    - 启动本地 HTTP 服务器，并自动打开浏览器查看课程总览与路线图
    - 支持 Ctrl+C 随时优雅退出
"""
import argparse
import functools
import http.server
import os
import socketserver
import sys
import webbrowser
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def find_workspace(specified=None):
    if specified and os.path.isdir(specified):
        return os.path.abspath(specified)
    # 尝试从 ~/.dsh/studymate-config.yaml 读取
    dsh_config = os.path.expanduser('~/.dsh/studymate-config.yaml')
    if os.path.isfile(dsh_config):
        try:
            with open(dsh_config, 'r', encoding='utf-8') as f:
                cfg = yaml.safe_load(f)
                ws = cfg.get('workspace')
                if ws and os.path.isdir(ws):
                    return os.path.abspath(ws)
        except Exception:
            pass
    # 保底检查本地 workspace 目录或 examples 目录
    local_ws = os.path.join(ROOT, 'workspace')
    if os.path.isdir(local_ws):
        return local_ws
    local_examples = os.path.join(ROOT, 'examples')
    if os.path.isdir(local_examples):
        return local_examples
    return ROOT


def main():
    if sys.platform == 'win32':
        if hasattr(sys.stdout, 'reconfigure'):
            sys.stdout.reconfigure(encoding='utf-8', errors='replace')

    parser = argparse.ArgumentParser(description='StudyMate-HighSchool Web Preview Server')
    parser.add_argument('--port', type=int, default=3000, help='服务监听端口 (默认: 3000)')
    parser.add_argument('--workspace', type=str, default=None, help='学习工作区根目录')
    parser.add_argument('--no-browser', action='store_true', help='不自动打开浏览器')
    args = parser.parse_args()

    target_dir = find_workspace(args.workspace)
    port = args.port

    Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=target_dir)

    for p in range(port, port + 20):
        try:
            with socketserver.TCPServer(("", p), Handler) as httpd:
                url = f"http://localhost:{p}/"
                print("=" * 60)
                print(f"🎓 StudyMate-HighSchool (高中版) Web 预览已启动!")
                print(f"📂 学习工作区目录: {target_dir}")
                print(f"🌐 访问入口: {url}")
                print(f"💡 提示: 按 Ctrl+C 即可停止服务器")
                print("=" * 60)

                if not args.no_browser:
                    try:
                        webbrowser.open(url)
                    except Exception:
                        pass

                httpd.serve_forever()
                break
        except OSError:
            continue


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\nWeb 预览服务已停止。祝你学习进步！")
