/**
 * @author Danny Palma
 * @fileoverview exports the user model
 */

import { Schema, model } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA4CAYAAABQZsDpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAeqSURBVGje3Zp/TBNnGMfJgGhiXCoICtjYqYRNs9kMBRyLGo1jW7JIFLPaksCGiPyIbZbI',
            'WMCAU9c5XCpzrtmP5JZFKIOay/7YWLItXYiJM8vCX8tUlEowFjCk6LBdBe7d+xReeHu993q9FqZ7kye013L3fu77/Hrfa0LCYzh2ckiT1/Gw+HGYi06r1RZt3LixfNu2bVX79u0L/oVjME8lJwCQ',
            '/A4f2tL5cO+iz37Dhg0F27dvbz5+/DjX29trm5ycbJYyt9ttvXDhAldVVfVhbm4u3HmdtDJeTX5nYHFBVq1aZaisrORgkiwAOQOw2tpaCwsq0ljKG3QavlwTK4feYrHYaAi/328dGRnhh4aGrty6dcvT39/vv379OiIGxwYGBtwej6dnfHzcLobC6lqimUBSt8mFDc2YsUUVBcSC0+mc',
            'm8zExIQNAMjkb9686b19+3bfnTt3XAAHdvfu3Z7BwcErAEPg4HvwGQ1lNpttSlRKdJYWz4PMWAIXpULYzxuIGqAETBgmduPGDT+8fvDggU2Jew0PD/MEDKDGxsY48ll9fb09ElCys9QshkluP6BXBQ',
            'JqwCRgMgDh8/lUxQzAY0XnzkOOt7a2yiuE4ySxy+imYFx0Kvw6r8PHy2QrCwG5f/++HVwKJiH2fWLTP161C9YOXjCfdxGbtn/nmPzjmqRyRGFwT5FCbNdxGHRPYYUSvzWVJXDF89/DOd0GJvU/a9asefXy5cs2ogiAYFU8YWoMDVsFc5sLba7wo+fKENOK6t1TZ9p5MRDEjxiopKTEFs/',
            'sq2loaLDTrgWKiEGExi97WBCejF1oTPsa+vuZ4pDjQn61V6wUASIuhzOgdeXKlYZ4FUMLuRDORn0AEhLkWA1UdMzNUmEqxxQEAaCB1AJ0TaNHg2mFKJBtmP+OSCXIjABEkgIUYll3U9qWQCDSdwyyUIgiO456ZF1KwgCuP2ULGl/7BhMIahIYeZ+dnW2OiQTaDXIycC9IpSEgh85ciRaE',
            'GCgDKnkyd80c23zIT7scqAI3j9Qh3CU4YoI5deqUlT4xXQsEazuvFoR2QQAiCgk4MdA3C24euYEQO0qbVEkXI1WexAp9IZRX7Y0Vhij059PPB8GCgI5fOHEyIDFaVFSkztUgHdMuBkE5V0McP3NSE5',
            't++wM09UMvmvr1Kpo+50DCnnfQ1Bd88P3UpZ+QYGhBrGxH3I1WBzoMgIFWCN6bTCa7Kpj9+/eXkQIJJxwdHXXMx8pHYbEivFw3M2k5w6Ao97Cku9HZDTIknQhI3Wlra1MHU1paGjzZvXv3HABDV3qpVCwYTkSGwSa8ZY0cS9ApiMoBvO7u7gaYtVHDNDY2ttB+GxovNWHxApNUBPNmS0Q',
            'YofGrHrrNgSYWXsOiLyYY0jOFwEhNArsPiRexPXL2oMDpz1DgzOdo8shpFGiyoUD9WSRsOSwNg/s4cc9GweyIGgaWtaSrBVcLgWG0LULtx5IwgXMcCpz4JMwmjY0RYejrz8Loo4aprq62sNp2KTebm8',
            'ix8+HKfPpNVDB0zNCmOmZw9X+XBSMcPNkn6/NihY6eDQN5VN+K3axSGgYvH6SuqzqbwUYFEwavUyIG8d730PTF7xHCtSZYg/aYZ2IlAoiQX+NlXbepqalZdetvt9s5yRNDpxxpzSI10Zeq0eTh95kgQVWoTCY21R0ADNx6tzDVgUVYHNqZMFUYK1HVmYwMvCiqYq7fQR0qEYiruKrGU0a',
            'V2T2BsLG1fUJxdtN0dnYyd1sgUIm7+dYfCK5RxrSvqwPBLZLcxodery9mbeHmdfjLQugK6APUKCwsPCJ3ERoIlBlMLwx2wQDlW1+izL1wdpS7BksV2MLNc/ibCzivjtrM+IcHQpY6sEsiu2X0+zUb7XI',
            'ANZr1ytwy2ZOxW7UiECtSqjAHkMn5HmyKy22Gz6kESUGmoIaoATs01NqFZTU1NbEtl6XGunXrzEo3x6GCg+sI0F3j5XAQAEMKexv/CjaRjIwltoqKCk7thnrEAfET7W4/',
            '9FnBNYpCAMU7mvECUuJyscAo2WuOq8spBYoWZnZpvDgg0cZQNDB1dXXmeGz2qRrQK8ULZva5zH86NPD0LFYYNcGe7/C78i9OWOINtFMufiLBRF0UycPbDp87v92nrgYVtE+UQ5cgVVzJElsNzGwtWSC/4cs1Sd2GncldRr24O4WHUSF90OzYtGlTGdxhKRspPxncY/uN6+KkPt+9e7dhQ',
            'UCSu02WJGepd+7RWpeRX8qXR/JlHV6VunF2Q1L2YvazaFfOC4j1eVZWlnvZsmX6+IJ0GcvFDzzDnhVKjNTUVC4nJwfFYhkZGa64wuBJ9zFg0NJLxrUyCzhXrDCgTlxhErtMbhZMUtdB5nI1PT2df+xgQn',
            '/toPzHAikpKRadTseMCSUGrhrfmOGN+iSnyRsOY4y4vbNkyRKzVqtFamzFihX8wuRlh0EHCs26nAsnBUVFafny5eVqXQy76cLVGTXjiYWBX+iBiQ+D76uBwTeiTE3XEZeBT96X1/GwT0odqBdgq1evdrNiJDMzE5Hv4eQhG49yXUdcxla4WxEaPFx7mllKAFDCkzT+VzCQqhetQC7GSEt',
            'Ls+H48OL4QcRwQ9oX96ZSNP4FuvQBnYQGcQwAAAAASUVORK5CYII='].join()
    },
    userID: {
        type: String,
        unique: true,
        required: true
    },
    isPremiun: {
        type: Boolean,
        default: false
    },
    joined_at: {
        type: Date,
        default: new Date()
    },
    skills: {
        type: Array,
        default: []
    },
    notifications: {
        type: Array,
        default: []
    },
    projects: {
        type: Array,
        default: []
    }
});

export default model<IUser>("users", UserSchema);
