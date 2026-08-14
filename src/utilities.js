export function formatTime(time){
    return time.slice(0,5);
}

export function formatDate (date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        timeZone: 'UTC'
    })
}

