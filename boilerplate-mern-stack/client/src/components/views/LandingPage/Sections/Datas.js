const kinds = [
    {
        "_id": 1,
        "name": "상의",
    },
    {
        "_id": 2,
        "name": "하의",
    },
    {
        "_id": 3,
        "name": "아우터",
    },
    {
        "_id": 4,
        "name": "신발",
    },
    {
        "_id": 5,
        "name": "모자",
    },
    {
        "_id": 6,
        "name": "액세서리",
    }
]

const price = [
    {
        "_id": 0,
        "name": "전체",
        "array": []
    },
    {
        "_id": 1,
        "name": "$10 이하",
        "array": [0, 10]
    },
    {
        "_id": 2,
        "name": "$10 ~ $20",
        "array": [10, 20]
    },
    {
        "_id": 3,
        "name": "$20 ~ $50",
        "array": [20, 50]
    },
    {
        "_id": 4,
        "name": "$50 이상",
        "array": [50, 999999]
    }
]

export { kinds, price }