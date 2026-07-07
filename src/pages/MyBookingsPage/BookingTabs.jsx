import { filterByTab } from "../../utils/booking"
 

function BookingTabs({ tabs, bookings, activeTab, onChange }) {
    return (
        <div className="flex gap-8 border-b border-tl-border mb-8">
            {tabs.map(tab => {
                const active = tab.id === activeTab
                const count = filterByTab(bookings, tab.id).length
 
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`flex items-center gap-2 pb-3 -mb-px text-sm border-b-2 transition cursor-pointer ${
                            active
                                ? "border-tl-ink text-tl-ink font-semibold"
                                : "border-transparent text-tl-muted hover:text-tl-ink"
                        }`}
                    >
                        {tab.label}
                        {count > 0 && (
                            <span
                                className={`min-w-5 h-5 px-1.5 inline-flex items-center justify-center rounded-full text-xs ${
                                    active
                                        ? "bg-tl-ink text-white"
                                        : "bg-tl-bg text-tl-muted border border-tl-border"
                                }`}
                            >
                                {count}
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}
 
export default BookingTabs