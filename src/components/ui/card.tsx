
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const CardHeader = ({ children, style }) => (
  <View style={[styles.header, style]}>
    {children}
  </View>
);

const CardTitle = ({ children, style }) => (
  <Text style={[styles.title, style]}>
    {children}
  </Text>
);

const CardDescription = ({ children, style }) => (
  <Text style={[styles.description, style]}>
    {children}
  </Text>
);

const CardContent = ({ children, style }) => (
  <View style={[styles.content, style]}>
    {children}
  </View>
);

const CardFooter = ({ children, style }) => (
  <View style={[styles.footer, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    padding: 24,
    flexDirection: 'column',
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
  },
  content: {
    padding: 24,
    paddingTop: 0,
  },
  footer: {
    padding: 24,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
