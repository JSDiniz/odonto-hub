"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertDoctorFrom from "./upsert-doctor-from";

const AddDoctorButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar médico
        </Button>
      </DialogTrigger>

      <UpsertDoctorFrom onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
};

export default AddDoctorButton;
