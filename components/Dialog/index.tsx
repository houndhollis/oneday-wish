import * as Headless from "@headlessui/react";
import clsx from "clsx";

export function Dialog({
  open,
  onClose,
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
} & Omit<Headless.DialogProps, "className">) {
  return (
    <Headless.Transition appear show={open}>
      <Headless.Dialog className="font-sea" onClose={onClose}>
        <Headless.DialogBackdrop
          transition
          className="flex items-center justify-center fixed inset-0 bg-black/50 z-50 transition duration-300 ease-out data-[closed]:opacity-0"
        >
          <Headless.DialogPanel
            className={clsx(
              className,
              "p-2 md:w-[424px] sm:w-[330px] w-[300px] bg-white rounded shadow-lg"
            )}
          >
            {children}
          </Headless.DialogPanel>
        </Headless.DialogBackdrop>
      </Headless.Dialog>
    </Headless.Transition>
  );
}

export function DialogTilte({
  className,
  ...props
}: { className?: string } & Omit<Headless.DialogTitleProps, "className">) {
  return <Headless.DialogTitle {...props} className={clsx(className, "")} />;
}

export function DialogBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={className} {...props} />;
}

export function DialogButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={className} {...props} />;
}
