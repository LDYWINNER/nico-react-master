import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 5000,
    });
    return <div>{isLoading ? "Loading chart..." : <ApexChart
        type="line"
        series={[
            {
                name: "Price",
                data: data?.map((price) => parseInt(price.close, 10)) ?? []
            },
        ]}
        options={{
            theme: {
                mode: isDark ? "dark" : "light",
            },
            chart: {
                height: 300,
                width: 500,
                toolbar: {
                    show: false,
                },
                background: "transparent",
            },
            grid: {
                show: false,
            },
            stroke: {
                curve: "smooth",
                width: 3,
            },
            yaxis: {
                show: false,
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
            },
            fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
                y: {
                    formatter: (value) => `$${value.toFixed(2)}`,
                }
            }
        }}
    />}
    </div>
}

export default Chart;