# Rekap Biaya API Spec

## Create Biaya API

Enpoint : POST /api/biaya

Headers : 
- Authorization : token

Resquest Body :
``` JSON 
{
    "tanggal": "23-10-2024",
    "kebutuhan": "makan",
    "jumlah": 10000,
}
```

Response Body Success : 

``` JSON 
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "tanggal": "23-10-2024",
            "kebutuhan": [
                {
                    "id": 1,
                    "tanggal": "23-10-2024",
                    "nama": "makan",
                    "jumlah": 10000
                }, 
                {
                    "id": 2, 
                    "tanggal": "23-10-2024",
                    "nama": "beli voucer internet",
                    "jumlah": 30000
                }, 
            ]
        },
    ],
    "message": "Biaya berhasil ditambahkan",
}
```

Response Body Erorr :
``` JSON 
{
    "status": "error",
    "message": "Gagal menambahkan biaya",
}
```

## Get Biaya API

Endpoint : GET /api/biaya

Headers: 
- Authorization : token

Response Body Success :

``` JSON
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "tanggal": "23-10-2024",
            "kebutuhan": [
                {
                    "id": 1,
                    "tanggal": "23-10-2024",
                    "nama": "makan",
                    "jumlah": 10000
                }, 
                {
                    "id": 2, 
                    "tanggal": "23-10-2024",
                    "nama": "beli voucer internet",
                    "jumlah": 30000
                }, 
            ]
        },
    ],
    "message": "Biaya berhasil diambil",
} 
```

Response Body Errr : 

``` JSON 
{
    "status": "error",
    "message": "Gagal mengambil biaya",
}

```