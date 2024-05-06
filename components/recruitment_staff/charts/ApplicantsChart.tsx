"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
    }[];
}

const ApplicantsChart = ({ data }: { data: ChartData }) => {
    const chartRef = useRef<Chart>();

    useEffect(() => {
        const ctx = document.getElementById("myChart") as HTMLCanvasElement;
        if (ctx) {
            // Check if a previous Chart instance exists and destroy it
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(ctx, {
                type: "bar",
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: "black",
                                font: {
                                    weight: "bold",
                                    size: 16,
                                },
                            },
                        },
                        x: {
                            beginAtZero: true,
                            ticks: {
                                color: "black",
                                font: {
                                    weight: "bold",
                                    size: 16,
                                },
                            },
                        },
                    },
                },
            });
        }

        // Cleanup function
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas id="myChart"></canvas>;
};

export default ApplicantsChart;
