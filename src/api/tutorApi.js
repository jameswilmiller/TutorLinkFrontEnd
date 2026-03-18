const API_BASE = import.meta.env.API_BASE;

export async function getAllTutors() {
    const response = await fetch(`${API_BASE}/tutors`);

    if(!response.ok) {
        throw new error("Failed to fetch tutors");
    }

    return response.json();
}

