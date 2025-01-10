import { Disclosure } from "@headlessui/react";
import favicon from "../../public/favicon.ico";

export default function HeaderNav() {
  return (
    <Disclosure as="nav" className="bg-[#2F241D]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="San Diego Padres"
                src={favicon}
                className="h-8 w-auto"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <p className="text-xs text-gray-300">An app by Amy Pirro</p>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
