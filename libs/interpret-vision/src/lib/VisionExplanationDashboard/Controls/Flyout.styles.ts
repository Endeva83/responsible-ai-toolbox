// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  IStyle,
  mergeStyleSets,
  IProcessedStyleSet,
  getTheme
} from "@fluentui/react";

export interface IFlyoutStyles {
  cell: IStyle;
  errorIcon: IStyle;
  explanation: IStyle;
  featureListContainer: IStyle;
  iconContainer: IStyle;
  image: IStyle;
  imageContainer: IStyle;
  label: IStyle;
  mainContainer: IStyle;
  separator: IStyle;
  successIcon: IStyle;
  title: IStyle;
}

export const flyoutStyles: () => IProcessedStyleSet<IFlyoutStyles> = () => {
  const theme = getTheme();
  return mergeStyleSets<IFlyoutStyles>({
    cell: {
      marginBottom: "20px"
    },
    errorIcon: {
      color: theme.semanticColors.errorIcon,
      fontSize: "large",
      fontWeight: "600"
    },
    explanation: {
      position: "relative",
      right: 85
    },
    featureListContainer: {
      height: 300,
      overflow: "auto"
    },
    iconContainer: {
      position: "relative",
      top: "2px"
    },
    image: {
      marginBottom: "20px"
    },
    imageContainer: {
      maxHeight: "250px",
      maxWidth: "250px"
    },
    label: {
      bottom: 20,
      position: "relative",
      textAlign: "start"
    },
    mainContainer: {
      height: "100%",
      overflow: "hidden"
    },
    separator: {
      root: {
        width: "100&"
      }
    },
    successIcon: {
      color: theme.semanticColors.successIcon,
      fontSize: "large",
      fontWeight: "600"
    },
    title: {
      fontWeight: "600"
    }
  });
};