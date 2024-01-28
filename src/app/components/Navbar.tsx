import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className=" relative  mx-auto flex h-fit min-h-[4rem] w-full max-w-screen-xl flex-wrap items-start justify-between bg-rose-600 px-4 text-white transition-[height] sm:px-8">
      <Link
        aria-label="logo"
        className="flex h-16 w-40 flex-none items-center"
        href="/"
      />
      <div
        id="header-slot"
        className="relative order-1 flex w-full flex-none items-center sm:order-none sm:w-auto sm:flex-1 sm:justify-center"
      >
        <div className="relative mt-[11px] flex w-fit select-none flex-row items-center justify-center">
          <div
            role="button"
            className='text-4-light-grey border-2-dark-grey after:content[""] bg-1-black group group isolate z-50 flex h-[42px] flex-row items-center whitespace-nowrap border-y py-3 pl-4 pr-6 after:absolute after:inset-0 after:-z-10 first:rounded-l-lg first:border-l last-of-type:rounded-r-lg last-of-type:border-r'
          >
            <div className="text-5-v-light-grey mr-1 text-sm group-hover:text-white">
              Whenever
            </div>
          </div>
          <div
            role="button"
            className='text-4-light-grey border-2-dark-grey after:content[""] bg-1-black before:bg-3-primary-grey before:content[""] group group relative isolate z-50 flex h-[42px] flex-row items-center whitespace-nowrap border-y py-3 pl-6 pr-[54px] before:absolute before:left-[-0.5px] before:h-5 before:w-px after:absolute after:inset-0 after:-z-10 first:rounded-l-lg first:border-l last-of-type:rounded-r-lg last-of-type:border-r'
          >
            <div className="text-5-v-light-grey mr-1 w-[50px] text-sm group-hover:text-white">
              Whoever
            </div>
          </div>
          <button
            aria-label="Search"
            className="text-4-light-grey group absolute right-[6px] z-50 grid h-8 w-8 place-items-center rounded-full"
          ></button>
        </div>
      </div>
      <div className="flex h-16 w-28 flex-none items-center justify-end sm:w-40">
        <a
          className="hover:bg-2-dark-grey relative ml-auto mr-4 grid h-10 w-10 place-items-center rounded-lg empty:hidden"
          href="/profile"
        ></a>
        <button
          className=' hover:after:bg-2-dark-grey group relative z-50 flex h-8 w-8 flex-col items-end justify-evenly pr-[3px] after:absolute after:left-1/2 after:top-1/2 after:z-[-1] after:h-10 after:w-10 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-lg after:content-[""]'
          aria-label="Navigation toggle"
          type="button"
        >
          <div className="h-px w-[1.6rem] rounded-full border-t-[1.5px] border-white transition duration-300"></div>
          <div className="h-px w-[21px] rounded-full border-t-[1.5px] border-white transition duration-300"></div>
          <div className="h-px w-[15px] rounded-full border-t-[1.5px] border-white transition duration-300"></div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
