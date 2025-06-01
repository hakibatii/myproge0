
import { useState, useCallback, useEffect } from "react";
import { ToasterToast, Action, State, actionTypes } from "@/hooks/toast/toast-types";
import {
  dispatch,
  listeners,
  memoryState,
  TOAST_REMOVE_DELAY,
  genId,
  toastTimeouts,
  toast as toastFunction
} from "@/hooks/toast/toast-reducer";

export function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  const toast = useCallback(
    (props: Omit<ToasterToast, "id"> & { id?: string }) => {
      // Using optional chaining with nullish coalescing to safely access the id or generate a new one
      const id = props?.id ?? genId();

      const update = (props: ToasterToast) =>
        dispatch({
          type: actionTypes.UPDATE_TOAST,
          toast: { ...props, id },
        });
      const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) dismiss();
          },
        },
      });

      return {
        id: id,
        dismiss,
        update,
      };
    },
    [dispatch]
  );

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { toastFunction as toast };
