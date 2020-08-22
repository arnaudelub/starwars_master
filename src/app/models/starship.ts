export interface Starship {
    id?: number,
    name?: string,
    model?: string,
    manufacturer?: string,
    cost_in_credits?: string,
    length?: string,
    max_atmosphering_speed?: string,
    crew?: string,
    passengers?: string,
    cargo_capacity?: string,
    consumables?: string,
    hyperdrive_rating?: string,
    MGLT?: string,
    starship_class?: string,
    pilots?: any,
    films?: any
    created?: any,
    edited?: any,
    url?: string,
    img?: String,
}

export interface swapiResponse {
    count?: number,
    next?: string,
    previous?: string,
    results?: Starship[],
}
