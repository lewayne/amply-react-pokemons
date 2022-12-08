
const formatType = (type: string): string => {
    let color: string;

    switch (type) {
        case 'Feu':
            color = 'red badge-secondary';
            break;
        case 'Eau':
            color = 'blue badge-primary';
            break;
        case 'Plante':
            color = 'green badge-primary';
            break;
        case 'Insecte':
            color = 'brown badge-primary';
            break;
        case 'Normal':
            color = 'grey badge-danger';
            break;
        case 'Vol':
            color = 'blue badge-danger';
            break;
        case 'Poison':
            color = 'badge-warning';
            break;
        case 'Fée':
            color = 'pink badge-danger';
            break;
        case 'Psy':
            color = 'badge-success';
            break;
        case 'Electrik':
            color = 'badge-success';
            break;
        case 'Combat':
            color = 'badge-success';
            break;
        default:
            color = 'grey';
            break;
    }

    return `badge p-2 mr-1 mb-1 ${color}`;
    //return `chip ${color}`;
}

export default formatType;