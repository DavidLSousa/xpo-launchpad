import React, { Component, ErrorInfo, ReactNode } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Colors, Spacing, Typography } from "../constants";
import { useI18nContext, useThemeContext } from "@/src/shared/context";
import { AlertTriangle } from "lucide-react-native";
import PrimaryButton from "./PrimaryButton";

interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onReset }) => {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const { t } = useI18nContext();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <AlertTriangle size={64} color={colors.expense} />
        <Text style={[styles.title, { color: colors.text }]}>
          {t("common.errorTitle")}
        </Text>
        <Text style={styles.message}>
          {error?.message || t("common.errorMessage")}
        </Text>
        <PrimaryButton
          title={t("common.retry")}
          onPress={onReset}
          marginH={Spacing.xl}
        />
      </View>
    </SafeAreaView>
  );
};

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to a service like Sentry here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback error={this.state.error} onReset={this.handleReset} />
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  title: {
    fontSize: Typography.h4,
    fontWeight: "bold",
    marginTop: Spacing.lg,
    textAlign: "center",
  },
  message: {
    fontSize: Typography.body,
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    color: "#666666",
  },
});

export default ErrorBoundary;
