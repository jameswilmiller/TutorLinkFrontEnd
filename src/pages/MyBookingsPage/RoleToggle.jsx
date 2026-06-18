const roles = [
    { value: "STUDENT", label: "As a student"},
    { value: "TUTOR", label: "As a tutor"}
]

function RoleToggle({currentRole, onRoleChange }) {
    return (
        <div className="inline-flex bg-tl-bg rounded-xl p-1">
            {roles.map((role) => {
                const isActive = currentRole === role.value
                
                return (
                    <button
                    key={role.value}
                    type="button"
                    onClick={() => onRoleChange(role.value)}
                    className={`px-4 py-2 rounded-xl text-sm cursor-pointer transition ${
                        isActive
                        ? "bg-white shadow-sm text-tl-ink"
                        : "text-tl-muted"
                    }`}>
                        {role.label}
                    </button>
                )
            })}
        </div>
    )
}
export default RoleToggle 