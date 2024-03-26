export const setPlayerAnimations = (context: Phaser.Animations.AnimationState) => {
    context.create({
        key: "face_up",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_up", {frames: [0, 2]})
    });
    context.create({
        key: "walk_up_1",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_up", {start: 0, end: 2})
    });
    context.create({
        key: "walk_up_2",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_up", {frames: [2, 3, 2]})
    });
    context.create({
        key: "face_down",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_down", {frames: [0, 2]})
    });
    context.create({
        key: "walk_down_1",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_down", {start: 0, end: 2})
    });
    context.create({
        key: "walk_down_2",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_down", {frames: [2, 3, 2]})
    });
    context.create({
        key: "face_left",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_left", {frames: [3, 3]})
    });
    context.create({
        key: "walk_left_1",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_left", {frames: [3, 2, 3]})
    });
    context.create({
        key: "walk_left_2",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_left", {frames: [1, 0, 1]})
    });
    context.create({
        key: "face_right",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_right", {frames: [0, 2]})
    });
    context.create({
        key: "walk_right_1",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_right", {start: 0, end: 2})
    });
    context.create({
        key: "walk_right_2",
        frameRate: 10,
        repeat: 0,
        frames: context.generateFrameNumbers(
            "player_right", {frames: [2, 3, 2]})
    });
}