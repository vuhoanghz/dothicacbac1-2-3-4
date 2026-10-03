"""
DataViz Studio - Local Development Server Launcher
Runs a lightweight HTTP server and opens your default web browser automatically.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    server_address = ("", PORT)
    try:
        with socketserver.TCPServer(server_address, Handler) as httpd:
            url = f"http://localhost:{PORT}/index.html"
            print("=" * 60)
            print("🚀 DataViz Studio - Trung Tâm Đồ Thị Tương Tác")
            print("=" * 60)
            print(f"📡 Máy chủ đang chạy tại: {url}")
            print("💡 Đang tự động mở trình duyệt...")
            print("👉 Nhấn Ctrl + C để dừng máy chủ bất cứ lúc nào.")
            print("=" * 60)
            
            webbrowser.open(url)
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 98 or "address already in use" in str(e).lower() or "winerror 10048" in str(e).lower():
            # Try port 8081
            alt_port = 8081
            with socketserver.TCPServer(("", alt_port), Handler) as httpd:
                url = f"http://localhost:{alt_port}/index.html"
                print(f"📡 Cổng {PORT} bận, chuyển sang: {url}")
                webbrowser.open(url)
                httpd.serve_forever()
        else:
            raise e
    except KeyboardInterrupt:
        print("\n🛑 Đã dừng máy chủ thành công. Hẹn gặp lại!")
        sys.exit(0)

if __name__ == "__main__":
    run()
