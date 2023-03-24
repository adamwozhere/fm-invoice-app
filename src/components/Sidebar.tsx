import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <Image src="/assets/logo.svg" width="40" height="38" alt="" />
      </div>
      <div className="toggle">
        <Image src="/assets/icon-moon.svg" width="20" height="20" alt="" />
      </div>
      <div className="avatar">
        <Image src="/assets/image-avatar.jpg" width="40" height="40" alt="" />
      </div>
    </div>
  );
}
