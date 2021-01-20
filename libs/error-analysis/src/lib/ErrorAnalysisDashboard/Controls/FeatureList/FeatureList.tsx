// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { localization } from "@responsible-ai/localization";
import {
  PrimaryButton,
  IFocusTrapZoneProps,
  IPanelProps,
  IPanelStyles,
  ISearchBoxStyles,
  IStackTokens,
  IStyleFunctionOrObject,
  Checkbox,
  Panel,
  SearchBox,
  Stack,
  Text
} from "office-ui-fabric-react";
import React from "react";

export interface IFeatureListProps {
  isOpen: boolean;
  onDismiss: () => void;
  saveFeatures: (features: string[]) => void;
  features: string[];
  theme?: string;
}

const focusTrapZoneProps: IFocusTrapZoneProps = {
  forceFocusInsideTrap: false,
  isClickableOutsideFocusTrap: true
};

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 120 } };

// Used to add spacing between example checkboxes
const checkboxStackTokens: IStackTokens = {
  childrenGap: "s1",
  padding: "m"
};

export interface IFeatureListState {
  searchedFeatures: string[];
  selectedFeatures: string[];
}

const panelStyles: IStyleFunctionOrObject<IPanelProps, IPanelStyles> = {
  main: { zIndex: 1 }
};

export class FeatureList extends React.Component<
  IFeatureListProps,
  IFeatureListState
> {
  public constructor(props: IFeatureListProps) {
    super(props);
    this.state = {
      searchedFeatures: this.props.features,
      selectedFeatures: this.props.features
    };
  }

  public render(): React.ReactNode {
    return (
      <Panel
        headerText="Feature List"
        isOpen={this.props.isOpen}
        focusTrapZoneProps={focusTrapZoneProps}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
        // layerProps={{ hostId: this.props.hostId }}
        isBlocking={false}
        onDismiss={this.props.onDismiss}
        styles={panelStyles}
      >
        <div className="featuresSelector">
          <Stack tokens={checkboxStackTokens} verticalAlign="space-around">
            <Stack.Item key="decisionTreeKey" align="start">
              <Text key="decisionTreeTextKey" variant="medium">
                {localization.ErrorAnalysis.treeMapDescription}
              </Text>
            </Stack.Item>
            <Stack.Item key="searchKey" align="start">
              <SearchBox
                placeholder="Search"
                styles={searchBoxStyles}
                onSearch={this.onSearch.bind(this)}
                onClear={this.onSearch.bind(this)}
                onChange={(_, newValue?: string): void =>
                  this.onSearch.bind(this)(newValue!)
                }
              />
            </Stack.Item>
            {this.state.searchedFeatures.map((feature) => (
              <Stack.Item key={"checkboxKey" + feature} align="start">
                <Checkbox
                  label={feature}
                  checked={this.state.selectedFeatures.includes(feature)}
                  onChange={this.onChange.bind(this, feature)}
                />
              </Stack.Item>
            ))}
            <Stack.Item key="applyButtonKey" align="start">
              <PrimaryButton
                text="Apply"
                onClick={this.apply.bind(this)}
                allowDisabledFocus
                disabled={false}
                checked={false}
              />
            </Stack.Item>
          </Stack>
        </div>
      </Panel>
    );
  }

  private onChange(
    feature?: string,
    _?: React.FormEvent<HTMLElement>,
    isChecked?: boolean
  ): void {
    if (isChecked) {
      if (!this.state.selectedFeatures.includes(feature!)) {
        this.setState({
          selectedFeatures: [...this.state.selectedFeatures.concat([feature!])]
        });
      }
    } else {
      this.setState({
        selectedFeatures: [
          ...this.state.selectedFeatures.filter(
            (stateFeature) => stateFeature !== feature!
          )
        ]
      });
    }
  }

  private onSearch(searchValue: string): void {
    this.setState({
      searchedFeatures: this.props.features.filter((feature) =>
        feature.includes(searchValue)
      )
    });
  }

  private apply(): void {
    this.props.saveFeatures(this.state.selectedFeatures);
  }
}