export async function fetchTutors() {
    const response = await fetch("http://localhost:8080/tutors");

    if(!response.ok) {
        throw new Error("Failed to fetch tutors");
    }

    const data = await response.json();
    return data;
}