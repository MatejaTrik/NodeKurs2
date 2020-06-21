
// Trade off between query performance vs consistency

// Using References (Normalizatino) -> CONSISTENSY
let author = {
    name: 'Mateja trikic'
}

let course = {
    author: 'id',
    
}

// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
    author: {
        name: 'Mateja'
    }
}

// Hybrid
let author = {
    name: 'Mateja'
    // 50 other properties
}

let course = {
    author: {
        id: 'ref',
        name: 'Mateja'
    }
}