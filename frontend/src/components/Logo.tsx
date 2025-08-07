import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 40, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 背景圆形 */}
      <circle cx="20" cy="20" r="19" fill="url(#gradient)" stroke="#fff" strokeWidth="2"/>
      
      {/* 小红书图标 - 简化的笔记样式 */}
      <rect x="12" y="10" width="16" height="20" rx="2" fill="#fff" opacity="0.9"/>
      
      {/* 笔记线条 */}
      <line x1="14" y1="14" x2="26" y2="14" stroke="#ff6b6b" strokeWidth="1.5"/>
      <line x1="14" y1="17" x2="24" y2="17" stroke="#ffa500" strokeWidth="1.5"/>
      <line x1="14" y1="20" x2="22" y2="20" stroke="#ff6b6b" strokeWidth="1.5"/>
      <line x1="14" y1="23" x2="20" y2="23" stroke="#ffa500" strokeWidth="1.5"/>
      
      {/* 装饰性元素 */}
      <circle cx="16" cy="26" r="1" fill="#ff6b6b"/>
      <circle cx="20" cy="26" r="1" fill="#ffa500"/>
      <circle cx="24" cy="26" r="1" fill="#ff6b6b"/>
      
      {/* 渐变定义 */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b"/>
          <stop offset="100%" stopColor="#ffa500"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo; 