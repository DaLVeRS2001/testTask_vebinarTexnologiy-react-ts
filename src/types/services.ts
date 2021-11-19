import { makeStyles } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

//getCertainData
export type CertainModel = {
  getTheme: ReturnType<typeof createMuiTheme>;
  getInputStyles: ReturnType<typeof makeStyles>;
  getTodoItemCardStyles: ReturnType<typeof makeStyles>;
  getTodoItemListStyles: ReturnType<typeof makeStyles>;
  staticSpring: {
    type: string;
    damping: number;
    stiffness: number;
    duration: number;
  };
};
export interface ICertainData {
  readonly getModel: () => CertainModel;
}
