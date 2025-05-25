
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface TripSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (success: boolean) => void;
}

const TripSuccessDialog = ({ open, onOpenChange, onConfirm }: TripSuccessDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>هل تمت الرحلة بنجاح؟</AlertDialogTitle>
          <AlertDialogDescription>
            يرجى تأكيد ما إذا كانت الرحلة قد تمت بنجاح مع المنظم
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col space-y-2 sm:space-y-0 sm:flex-row">
          <AlertDialogAction
            onClick={() => onConfirm(true)}
            className="bg-green-500 hover:bg-green-600 flex items-center justify-center"
          >
            نعم، تمت الرحلة بنجاح
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={() => onConfirm(false)}
            className="bg-gray-300 hover:bg-gray-400 flex items-center justify-center"
          >
            لا، لم تتم الرحلة
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TripSuccessDialog;
