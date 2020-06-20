import textureCat from "./textures/cat.png";
import textureFlower from "./textures/flower.png";
import textureMoon from "./textures/moon.png";
import textureStar1 from "./textures/star1.png";
import textureStar2 from "./textures/star2.png";
import textureStar3 from "./textures/star3.png";

const config = {
    entities: [

        {
            name: "cat",
            count: 1,
            props: {
                positionRange: [{min: -2, max: 2}, {min: -22, max: -22}, {min: -2, max: 2}],
                textureImage: textureCat,
                frameDuration: 1500,
                mesh: {
                    scale: [2, 2, 2]
                },
                geometry: {
                    args: [1, 1, 1, 1]
                },
                material: {
                    framesHorizontal: 2,
                    framesVertial: 1
                }
            }
        },

        {
            name: "flower",
            count: 16,
            props: {
                positionRange: [{min: -16, max: 16}, {min: -22, max: -22}, {min: -16, max: 16}],
                textureImage: textureFlower,
                frameDuration: 500,
                mesh: {
                    scale: [1, 1, 1]
                },
                geometry: {
                    args: [1, 1, 1, 1]
                },
                material: {
                    framesHorizontal: 2,
                    framesVertical: 1
                }
            }
        },

        {
            name: "moon",
            count: 1,
            props: {
                positionRange: [{min: -32, max: -32}, {min: 16, max: 16}, {min: -64, max: -64}],
                textureImage: textureMoon,
                frameDuration: 1000,
                mesh: {
                    scale: [4, 4, 4]
                },
                geometry: {
                    args: [1, 1, 1, 1]
                },
                material: {
                    framesHorizontal: 1,
                    framesVertical: 1
                }
            }
        },

        {
            name: "star1",
            count: 128,
            props: {
                positionRange: [{min: -16, max: 16}, {min: -16, max: 16}, {min: -16, max: 16}],
                textureImage: textureStar1,
                frameDuration: 250,
                mesh: {
                    scale: [1, 1, 1]
                },
                geometry: {
                    args: [1, 1, 1, 1]
                },
                material: {
                    framesHorizontal: 2,
                    framesVertical: 1
                }
            }
        },

        {
            name: "star2",
            count: 128,
            props: {
                positionRange: [{min: -16, max: 16}, {min: -16, max: 16}, {min: -16, max: 16}],
                textureImage: textureStar2,
                frameDuration: 150,
                mesh: {
                    scale: [1, 1, 1]
                },
                geometry: {
                    args: [1, 1, 1, 1]
                },
                material: {
                    framesHorizontal: 2,
                    framesVertical: 1
                }
            }
        },

        {
            name: "star3",
            count: 128,
            props: {
                positionRange: [{min: -16, max: 16}, {min: -16, max: 16}, {min: -16, max: 16}],
                textureImage: textureStar3,
                frameDuration: 125,
                mesh: {
                    scale: [1, 1, 1]
                },
                geometry: {
                    args: [1, 1, 1, 1]
                },
                material: {
                    framesHorizontal: 4,
                    framesVertical: 1
                }
            }
        }

    ]
};

export default config;