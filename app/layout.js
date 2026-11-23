import './globals.css';

export const metadata = {
  title: '泡泡毛球 · 宠物洗护',
  description: '泡泡毛球宠物洗护，提供基础洗澡、深层护理和造型修剪。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
