export const months = [
 { value: 1, label: "January" },
 { value: 2, label: "February" },
 { value: 3, label: "March" },
 { value: 4, label: "April" },
 { value: 5, label: "May" },
 { value: 6, label: "June" },
 { value: 7, label: "July" },
 { value: 8, label: "August" },
 { value: 9, label: "September" },
 { value: 10, label: "October" },
 { value: 11, label: "November" },
 { value: 12, label: "December" },
];

export const years = Array.from(
 { length: 4 },
 (_, i) => new Date().getFullYear() - i
);

export const colors = [
 "#0088FE",
 "#00C49F",
 "#FFBB28",
 "#FF8042",
 "#8884D8",
 "#82CA9D",
 "#FFD700",
 "#FFA07A",
 "#2FBA2A",
 "#C0137F",
 "#D90F38",
 "#4B0082",
 "#FF69B4",
 "#00CED1",
];
