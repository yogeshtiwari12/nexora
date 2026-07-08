export const activityLogs = [
  { id: "1", user: "Alex Kaminski", action: "Approved Deal #1042", module: "Pipeline", status: "success", ip: "192.168.1.42", timestamp: "10 mins ago" },
  { id: "2", user: "Sarah Jenkins", action: "Exported Q3 Revenue", module: "Reports", status: "success", ip: "10.0.0.15", timestamp: "1 hour ago" },
  { id: "3", user: "Marcus Lowe", action: "Failed Login Attempt", module: "Security", status: "warning", ip: "203.0.113.4", timestamp: "3 hours ago" },
  { id: "4", user: "Elena Rodriguez", action: "Created New Account", module: "Customers", status: "success", ip: "192.168.1.18", timestamp: "5 hours ago" },
  { id: "5", user: "System", action: "Database Backup Completed", module: "System", status: "success", ip: "127.0.0.1", timestamp: "12 hours ago" },
];

export const monthlySales = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1900 },
  { month: "Mar", sales: 1500 },
  { month: "Apr", sales: 2200 },
  { month: "May", sales: 2800 },
  { month: "Jun", sales: 2400 },
  { month: "Jul", sales: 3192 },
];

export const acquisition = [
  { month: "Jan", organic: 400, paid: 240, referral: 100 },
  { month: "Feb", organic: 500, paid: 280, referral: 120 },
  { month: "Mar", organic: 450, paid: 310, referral: 150 },
  { month: "Apr", organic: 600, paid: 250, referral: 180 },
  { month: "May", organic: 700, paid: 300, referral: 210 },
  { month: "Jun", organic: 850, paid: 350, referral: 250 },
];

export const forecast = [
  { month: "Aug", revenue: 420000, target: 400000 },
  { month: "Sep", revenue: 450000, target: 430000 },
  { month: "Oct", revenue: 510000, target: 480000 },
  { month: "Nov", revenue: 580000, target: 540000 },
];

export const customerGrowth = [
  { month: "Jan", customers: 10200, churn: 150 },
  { month: "Feb", customers: 10800, churn: 180 },
  { month: "Mar", customers: 11200, churn: 140 },
  { month: "Apr", customers: 11900, churn: 210 },
  { month: "May", customers: 12400, churn: 190 },
  { month: "Jun", customers: 12847, churn: 220 }
];

export const revenueTrend = [
  { month: "Jan", revenue: 210000, target: 200000 },
  { month: "Feb", revenue: 240000, target: 220000 },
  { month: "Mar", revenue: 230000, target: 240000 },
  { month: "Apr", revenue: 280000, target: 270000 },
  { month: "May", revenue: 310000, target: 300000 },
  { month: "Jun", revenue: 340000, target: 330000 },
  { month: "Jul", revenue: 380000, target: 360000 },
  { month: "Aug", revenue: 360000, target: 370000 },
  { month: "Sep", revenue: 410000, target: 390000 },
  { month: "Oct", revenue: 400000, target: 410000 },
  { month: "Nov", revenue: 429000, target: 420000 },
  { month: "Dec", revenue: 450000, target: 440000 }
];

export const calendarEvents = [
  { day: 12, items: [
    { title: "Q3 Board Meeting", time: "10:00 AM", tone: "primary" },
    { title: "Sync with Acme Corp", time: "02:30 PM", tone: "success" }
  ]},
  { day: 14, items: [
    { title: "Product Launch Go/No-Go", time: "11:00 AM", tone: "warning" }
  ]},
  { day: 18, items: [
    { title: "Quarterly Review", time: "09:00 AM", tone: "primary" }
  ]}
];

export const companies = [
  { id: "C1", name: "Acme Corp", initials: "AC", industry: "Manufacturing", status: "Enterprise", revenue: "$4.2M", employees: 1250, manager: "Sarah Jenkins", deals: 3 },
  { id: "C2", name: "TechNova", initials: "TN", industry: "Software", status: "Mid-Market", revenue: "$1.8M", employees: 340, manager: "Marcus Lowe", deals: 1 },
  { id: "C3", name: "Global Logistics", initials: "GL", industry: "Logistics", status: "Prospect", revenue: "$800k", employees: 85, manager: "Elena Rodriguez", deals: 2 },
  { id: "C4", name: "Stark Industries", initials: "SI", industry: "Defense", status: "Enterprise", revenue: "$12.5M", employees: 8500, manager: "Alex Kaminski", deals: 5 },
];

export const customers = [
  { id: "USR-001", name: "John Doe", company: "Acme Corp", industry: "Manufacturing", manager: "Sarah Jenkins", status: "VIP", priority: "High", email: "john@acme.corp", phone: "+1 (555) 123-4567", ltv: 125000, lastContact: "2 hours ago", nextFollowup: "Tomorrow" },
  { id: "USR-002", name: "Jane Smith", company: "TechNova", industry: "Software", manager: "Marcus Lowe", status: "Active", priority: "Medium", email: "jane@technova.io", phone: "+1 (555) 987-6543", ltv: 85000, lastContact: "Yesterday", nextFollowup: "Next Week" },
  { id: "USR-003", name: "Robert Chase", company: "Global Logistics", industry: "Logistics", manager: "Elena Rodriguez", status: "Prospect", priority: "Low", email: "robert@global.log", phone: "+1 (555) 456-7890", ltv: 12000, lastContact: "3 days ago", nextFollowup: "Next Month" },
  { id: "USR-004", name: "Emily Chen", company: "Stark Industries", industry: "Defense", manager: "Alex Kaminski", status: "VIP", priority: "High", email: "emily@stark.ind", phone: "+1 (555) 111-2222", ltv: 450000, lastContact: "1 hour ago", nextFollowup: "Today" },
  { id: "USR-005", name: "Michael Chang", company: "Nexus Health", industry: "Healthcare", manager: "Sarah Jenkins", status: "Active", priority: "Medium", email: "mchang@nexus.health", phone: "+1 (555) 222-3333", ltv: 62000, lastContact: "4 hours ago", nextFollowup: "Next Week" },
  { id: "USR-006", name: "Sarah Parker", company: "Quantum Finance", industry: "Finance", manager: "Marcus Lowe", status: "VIP", priority: "High", email: "sparker@quantum.fin", phone: "+1 (555) 333-4444", ltv: 215000, lastContact: "Just now", nextFollowup: "Tomorrow" },
  { id: "USR-007", name: "David Kim", company: "EcoEnergy", industry: "Energy", manager: "Alex Kaminski", status: "Active", priority: "Low", email: "dkim@ecoenergy.co", phone: "+1 (555) 444-5555", ltv: 45000, lastContact: "Last Week", nextFollowup: "Next Month" },
  { id: "USR-008", name: "Lisa Wong", company: "Retail Prime", industry: "Retail", manager: "Elena Rodriguez", status: "Prospect", priority: "High", email: "lwong@retailprime.com", phone: "+1 (555) 555-6666", ltv: 8000, lastContact: "2 days ago", nextFollowup: "Tomorrow" },
  { id: "USR-009", name: "James Wilson", company: "BuildRight", industry: "Construction", manager: "Marcus Lowe", status: "Churned", priority: "Low", email: "jwilson@buildright.net", phone: "+1 (555) 666-7777", ltv: 15000, lastContact: "1 month ago", nextFollowup: "None" },
  { id: "USR-010", name: "Anna Martinez", company: "EduTech Global", industry: "Education", manager: "Sarah Jenkins", status: "Active", priority: "Medium", email: "amartinez@edutech.edu", phone: "+1 (555) 777-8888", ltv: 34000, lastContact: "Yesterday", nextFollowup: "Next Week" },
];
export const kpis = [
  { id: 'revenue', label: 'TOTAL REVENUE', value: 4.29, prefix: '$', suffix: 'M', change: 12.4, trend: 'up', sparkline: [1, 1.2, 1.5, 1.8, 2.2, 2.8, 3.2, 3.8, 4.29] },
  { id: 'growth', label: 'MONTHLY GROWTH', value: 18.6, suffix: '%', change: 3.2, trend: 'up', sparkline: [10, 11, 12, 14, 15, 16, 17, 18, 18.6] },
  { id: 'customers', label: 'ACTIVE CUSTOMERS', value: 12847, suffix: '', change: 8.1, trend: 'up', sparkline: [11000, 11500, 11800, 12000, 12200, 12400, 12600, 12847] },
  { id: 'new', label: 'NEW CUSTOMERS', value: 384, suffix: '', change: 24.3, trend: 'up', sparkline: [200, 220, 250, 280, 300, 320, 350, 384] },
  { id: 'conversion', label: 'CONVERSION RATE', value: 32.8, suffix: '%', change: 2.1, trend: 'up', sparkline: [25, 26, 26.5, 27, 28, 29, 30.5, 31.5, 32.8] },
  { id: 'retention', label: 'CUSTOMER RETENTION', value: 94.2, suffix: '%', change: 0.8, trend: 'up', sparkline: [90, 91, 91.5, 92, 92.5, 93, 93.5, 94, 94.2] },
  { id: 'sales', label: 'SALES CLOSED', value: 267, suffix: '', change: 15.7, trend: 'up', sparkline: [100, 120, 140, 150, 180, 200, 220, 240, 267] },
  { id: 'opps', label: 'OPEN OPPORTUNITIES', value: 148, suffix: '', change: -4.2, trend: 'down', sparkline: [200, 190, 185, 180, 175, 170, 160, 155, 148] },
];

export const funnel = [
  { stage: 'Website Visitors', value: 250000 },
  { stage: 'Leads Generated', value: 45000 },
  { stage: 'Qualified Leads', value: 12000 },
  { stage: 'Opportunities', value: 4500 },
  { stage: 'Closed Won', value: 2000 },
];

export const revenueSources = [
  { name: 'Enterprise', value: 2400000 },
  { name: 'Mid-Market', value: 1200000 },
  { name: 'SMB', value: 450000 },
  { name: 'Self-Serve', value: 240000 },
];

export const regionalSales = [
  { region: 'North America', growth: 15.2, value: 2145000, share: 50 },
  { region: 'Europe', growth: 12.4, value: 1287000, share: 30 },
  { region: 'Asia Pacific', growth: 18.5, value: 643500, share: 15 },
  { region: 'Latin America', growth: 8.1, value: 214500, share: 5 },
];

export const teamPerformance = [
  { avatar: 'SJ', revenue: 850000 },
  { avatar: 'ML', revenue: 720000 },
  { avatar: 'AK', revenue: 640000 },
  { avatar: 'ER', revenue: 580000 },
  { avatar: 'TJ', revenue: 340000 },
];

export const insights = [
  { id: '1', tone: 'success', icon: 'TrendingUp', title: 'Revenue target on track', body: 'Q3 revenue is currently tracking 12.4% ahead of the adjusted quarterly plan.' },
  { id: '2', tone: 'warning', icon: 'AlertTriangle', title: 'Churn risk in Enterprise', body: '3 enterprise accounts in the manufacturing sector showing lower engagement scores.' },
  { id: '3', tone: 'info', icon: 'Award', title: 'Sarah achieved quota', body: 'Sarah Jenkins has reached her Q3 quota 2 weeks ahead of schedule.' },
  { id: '4', tone: 'info', icon: 'Clock', title: 'Product sync in 1 hour', body: 'Agenda: review design updates for pipeline board and calendar drag-and-drop.' },
  { id: '5', tone: 'success', icon: 'Users', title: 'New VIP onboarded', body: 'Stark Industries completed onboarding checklist and scheduled kickoff.' },
  { id: '6', tone: 'warning', icon: 'AlertTriangle', title: 'Overdue task warning', body: '2 deliverables for Quantum Finance are past due. Action required.' }
];

export const upcomingMeetings = [
  { id: "m1", title: "Priya Ramanathan", time: "14:30", subtitle: "Northwind Capital · Board Sync", priority: "High" },
  { id: "m2", title: "Kenji Tanaka", time: "17:00", subtitle: "Sakura Digital · Contract Review", priority: "High" },
  { id: "m3", title: "Julian Weiss", time: "10:00", subtitle: "Helix Biotech · Discovery", priority: "Medium" },
  { id: "m4", title: "Ana Costa", time: "15:30", subtitle: "Meridian Retail · Proposal Walkthrough", priority: "High" },
  { id: "m5", title: "Rohan Malhotra", time: "09:00", subtitle: "Vertex Manufacturing · Executive ...", priority: "Medium" },
];

export const pipelineDeals = [
  { id: "d1", company: "Acme Corp", title: "Enterprise License", value: 125000, stage: "Qualified", probability: 60, assignee: "Sarah Jenkins" },
  { id: "d2", company: "Global Logistics", title: "Q3 Expansion", value: 45000, stage: "Proposal", probability: 80, assignee: "Elena Rodriguez" },
  { id: "d3", company: "TechNova", title: "Platform Migration", value: 210000, stage: "Lead", probability: 20, assignee: "Marcus Lowe" },
  { id: "d4", company: "Stark Industries", title: "Global Security Integration", value: 850000, stage: "Won", probability: 100, assignee: "Alex Kaminski" },
  { id: "d5", company: "Wayne Enterprises", title: "Data Center Upgrade", value: 340000, stage: "Proposal", probability: 75, assignee: "Sarah Jenkins" },
  { id: "d6", company: "Oscorp", title: "Biotech Division Setup", value: 120000, stage: "Lost", probability: 0, assignee: "Marcus Lowe" },
];

export const tasks = [
  { id: "t1", title: "Finalize Acme Corp proposal", due: "Today", priority: "High", completed: false, tag: "Sales" },
  { id: "t2", title: "Send Q2 performance review to team", due: "Tomorrow", priority: "Medium", completed: false, tag: "Management" },
  { id: "t3", title: "Review SOC2 compliance doc", due: "Yesterday", priority: "High", completed: false, tag: "Security" },
  { id: "t4", title: "Welcome email to new VP of Engineering", due: "Today", priority: "Low", completed: true, tag: "HR" },
  { id: "t5", title: "Sync with Elena on Global Logistics account", due: "Oct 24", priority: "Medium", completed: false, tag: "Sales" },
];

export const reportsList = [
  { id: "r1", title: "Q3 Executive Revenue Summary", date: "Oct 15, 2026", type: "PDF", size: "2.4 MB", author: "Alex Kaminski" },
  { id: "r2", title: "Enterprise Churn Analysis - YTD", date: "Oct 12, 2026", type: "CSV", size: "845 KB", author: "Sarah Jenkins" },
  { id: "r3", title: "Sales Rep Performance Board", date: "Oct 10, 2026", type: "PDF", size: "1.1 MB", author: "System" },
  { id: "r4", title: "Lead Generation Sources - Sept", date: "Oct 01, 2026", type: "XLSX", size: "3.2 MB", author: "Elena Rodriguez" },
  { id: "r5", title: "Annual Forecast Variance", date: "Sep 28, 2026", type: "PDF", size: "1.8 MB", author: "System" },
];

export const teamMetrics = [
  { rep: "Sarah Jenkins", role: "Enterprise AE", quota: 1200000, closed: 850000, pipeline: 1450000, winRate: 42, meetings: 14 },
  { rep: "Marcus Lowe", role: "Mid-Market AE", quota: 800000, closed: 720000, pipeline: 980000, winRate: 38, meetings: 22 },
  { rep: "Alex Kaminski", role: "VP Sales", quota: 3500000, closed: 3100000, pipeline: 4200000, winRate: 48, meetings: 18 },
  { rep: "Elena Rodriguez", role: "SMB AE", quota: 600000, closed: 580000, pipeline: 450000, winRate: 35, meetings: 31 },
];

