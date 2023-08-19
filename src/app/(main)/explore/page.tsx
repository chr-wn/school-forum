import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/Command";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const categories = await db.category.findMany();

  return (
    <Command className="relative rounded-lg border z-50 overflow-visible">
      <CommandInput
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search all categories"
      />
      <ScrollArea className={`${categories.length > 5 && "h-[250px]"}`}>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {categories.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem key={category.id} className="w-full h-full py-0">
                    <Link
                      href={`/categories/${category.url}`}
                      className="h-full w-full py-1.5 flex items-center"
                    >
                      <div className="rounded-full overflow-hidden h-[25px] w-[25px] mr-2">
                        <Image
                          src={category.image}
                          alt="Category Icon"
                          width={50}
                          height={50}
                          sizes="100vw"
                          className="inline h-full w-auto rounded-full object-cover"
                        />
                      </div>
                      {category.name}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </ScrollArea>
    </Command>
  );
};

export default page;
