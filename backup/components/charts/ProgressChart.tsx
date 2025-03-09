import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

interface ProgressChartProps {
  progressData: number[];
  categoryData: {
    category: string;
    progress: number;
  }[];
}

export default function ProgressChart({ progressData, categoryData }: ProgressChartProps) {
  const screenWidth = Dimensions.get('window').width - 40; // Account for padding

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: progressData
    }]
  };

  const categoryChartData = {
    labels: categoryData.map(item => item.category),
    datasets: [{
      data: categoryData.map(item => item.progress)
    }]
  };

  const chartConfig = {
    backgroundColor: '#1C1C1E',
    backgroundGradientFrom: '#1C1C1E',
    backgroundGradientTo: '#1C1C1E',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(10, 132, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(142, 142, 147, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#0A84FF'
    }
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={lineChartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
      <BarChart
        data={categoryChartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        showValuesOnTopOfBars={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});
