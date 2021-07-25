import * as React from "react";
import { TextStyle } from "react-native";
import { TouchableHighlight } from "react-native";
import {
  SectionListData,
  StyleSheet,
  Text,
  View,
  SectionList as NativeSectionList,
} from "react-native";
import { colors, fontSizes } from "../../styles/variables";
import { Card } from "../Card/Card";

export interface Item {
  field?: string;
  value: string | number;
  onClick?: (item: Item) => void;
}

interface SectionListInput {
  sections: SectionListData<Item>[];
  native?: boolean;
}

export const SectionList = ({ sections, native }: SectionListInput) => {
  return native ? (
    <NativeSectionList
      testID="list"
      sections={sections}
      keyExtractor={(item, index) => index + ""}
      renderItem={({ item, index }) => <Item item={item} index={index} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.title}>{title}</Text>
      )}
      disableVirtualization={true}
    />
  ) : (
    <ViewList sections={sections} />
  );
};

const ViewList = ({ sections }: { sections: SectionListData<Item>[] }) => (
  <View testID="list">
    {sections
      .filter((section) => section.data.length)
      .map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.title}>{section.title}</Text>
          <Items items={section.data}></Items>
        </View>
      ))}
  </View>
);

const Item = ({ item, index }: { item: Item; index: number }) => {
  const isEven = index % 2 === 1;
  const itemStyles = isEven
    ? [styles.item, styles.evenItem]
    : [styles.item, styles.oddItem];
  const hasField = !!item.field;
  const valueStyle = hasField
    ? styles.value
    : [styles.value, styles.fullWidthValue];

  const itemTexts = (
    <React.Fragment>
      {hasField ? <Text style={styles.field}>{item.field}</Text> : undefined}
      <Text style={valueStyle}>{item.value}</Text>
    </React.Fragment>
  );
  const itemContent = item.onClick ? (
    <TouchableHighlight
      style={styles.item}
      onPress={() => item.onClick?.(item)}
      underlayColor="rgba(255, 255, 255, 0.2)"
    >
      {itemTexts}
    </TouchableHighlight>
  ) : (
    itemTexts
  );

  return (
    <View key={index} style={itemStyles}>
      {itemContent}
    </View>
  );
};

const Items = ({ items }: { items: readonly Item[] }) => (
  <Card>
    {items
      .filter((item) => item.value)
      .map((item, index) => (
        <Item key={index} item={item} index={index}></Item>
      ))}
  </Card>
);

const baseItemStyles: TextStyle = {
  color: colors.text,
  display: "flex",
  alignItems: "center",
  paddingHorizontal: 30,
  paddingVertical: 15,
  textTransform: "capitalize",
  fontSize: fontSizes.m,
};

const styles = StyleSheet.create({
  sectionList: {
    color: colors.text,
  },
  section: {},
  title: {
    fontSize: fontSizes.xl,
    color: colors.text,
    marginVertical: 10,
  },
  items: {
    borderRadius: 10,
    overflow: "hidden",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: colors.shadow,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  field: {
    ...baseItemStyles,
    fontWeight: "bold",
    width: "45%",
    color: colors.text,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  evenItem: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  oddItem: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  value: {
    ...baseItemStyles,
    color: colors.text,
    width: "55%",
  },
  fullWidthValue: {
    width: "100%",
  },
});
