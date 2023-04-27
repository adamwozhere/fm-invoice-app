import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="sidebar flex w-25 flex-col items-center rounded-r-4xl bg-gunpowder">
      <div className="logo relative isolate mb-auto grid h-25 w-25 place-items-center rounded-r-4xl bg-violet before:absolute before:bottom-0 before:-z-10 before:h-1/2 before:w-25 before:rounded-br-4xl before:rounded-tl-4xl before:bg-crocus">
        <Image src="/assets/logo.svg" width="40" height="37" alt="" />
      </div>
      <div className="toggle grid h-24 w-25 place-items-center">
        <Image
          className="cursor-pointer"
          src="/assets/icon-moon.svg"
          width="20"
          height="20"
          alt=""
        />
      </div>
      <div className="avatar grid h-24 w-25 place-items-center border-t border-stone">
        <Image
          className="cursor-pointer rounded-full"
          src="/assets/image-avatar.jpg"
          width="40"
          height="40"
          alt=""
        />
      </div>
    </div>
  );
}
