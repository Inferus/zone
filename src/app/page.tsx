import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

import { FaFileAlt } from "react-icons/fa";
import { readdir } from "fs/promises";
import Image from "next/image";

export default async function Home() {
  const files = await readdir("public/files");

  return (
    <section className="container pt-5 flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Save your file</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Move or select your file here</CardDescription>
        </CardContent>
        <CardFooter className="gap-5">
          <form
            className="flex gap-5"
            action="/api/fileupload"
            method="post"
            encType="multipart/form-data"
          >
            <Input id="file" name="file" type="file" />
            <Button>Upload</Button>
          </form>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Files</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <CardDescription>Here are your files</CardDescription>
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {files.map((file) => (
              <Card
                className="hover:bg-accent cursor-pointer gap-4 flex flex-col"
                key={file}
              >
                <CardHeader className="items-center">
                  {file.endsWith(".png") ||
                  file.endsWith("jpg") ||
                  file.endsWith("jpeg") ? (
                    <Image
                      alt="file"
                      width={200}
                      height={200}
                      src={`/files/${file}`}
                    />
                  ) : (
                    <FaFileAlt size={100}></FaFileAlt>
                  )}
                </CardHeader>
                <CardDescription className="text-center break-all p-2">
                  {file}
                </CardDescription>
                <CardFooter className="justify-center gap-5">
                  <Button className="bg-red-600">Delete</Button>
                  <Button>Download</Button>
                </CardFooter>
              </Card>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
