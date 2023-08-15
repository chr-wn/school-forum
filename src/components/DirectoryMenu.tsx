"use client";

import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { SIDEBAR_ITEMS } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Category } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "./ui/ScrollArea";

interface SearchBarProps {
  categories: Category[];
}

const SearchBar: FC<SearchBarProps> = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  function getPath() {
    const path = pathname.split("/");
    if (path.includes("submit")) {
      return "Create Post";
    } else if (path.includes("categories")) {
      return path[2];
    } else if (path.length === 2) {
      return path[1].charAt(0).toUpperCase() + path[1].slice(1);
    }
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {getPath()}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command
            ref={commandRef}
            className="relative rounded-lg border z-50 overflow-visible"
          >
            <CommandInput
              onValueChange={(text) => {
                setInput(text);
              }}
              value={input}
              className="outline-none border-none focus:border-none focus:outline-none ring-0"
              placeholder="Filter"
            />

            <ScrollArea>
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  {SIDEBAR_ITEMS.map((item) => (
                    <CommandItem key={item.label} className="w-full h-full">
                      <Link
                        href={`${item.href}`}
                        className="flex items-center w-full"
                      >
                        <item.icon className="mr-2.5 inline" strokeWidth={1} />
                        <span>{item.label}</span>
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Following">
                  {categories.map((category) => (
                    <CommandItem key={category.id}>
                      <Link href={`/categories/${category.name}`}>
                        {category.name}
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SearchBar;
