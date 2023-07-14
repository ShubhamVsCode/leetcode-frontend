import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "./textEditor/TextEditor";
import { Edit3Icon, PencilIcon } from "lucide-react";

export function Model({
  field,
  state,
  setState,
}: {
  field: string;
  state: string;
  setState: (state: string) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm">
          <Edit3Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[60vw]">
        <DialogHeader>
          <DialogTitle>Write {field}</DialogTitle>
        </DialogHeader>
        <TextEditor hideToolbar={false} state={state} setState={setState} />
        {/* <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
