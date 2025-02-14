import { Layout, makeScene2D, Rect } from "@motion-canvas/2d";
import { AudioManager, createRef, easeInOutCubic, waitFor, } from "@motion-canvas/core";

import { Typewriter } from "./Typewriter";


export default makeScene2D(function* (view) {
    const fadeIn = createRef<Rect>();
    const typewriter = createRef<Typewriter>();
    const layout = <Layout/>;

    view.add(
        layout
    )

    layout.add(<Rect
        ref={fadeIn}
        width={1920}
        height={1080}
        fill={'black'}
        opacity={1}
    />);
    yield* fadeIn().opacity(0, 1.5, easeInOutCubic);
    yield* waitFor(0.8);

    yield* write('Hello.', undefined, 1);
    yield* write('How are you doing?', 3, 1.3);
    yield* write('Have you wondered...', 2, 1.5);
    yield* write("What's the difference between a Bubble Sort and a Quicksort Algorithm?", 6, 2, false);

    //yield* typewriter().typewrite(5);
    //yield* waitFor(1.5);
    //typewriter().message('Hi');
    //typewriter().text('');
    //yield* typewriter().typewrite(0.1);
    //yield* waitFor(1.5);
    

    function* write(text: string, vel: number, timeOut: number, remove: boolean = true) {
        const tpwrt = 
        <Typewriter
            ref={typewriter}
            message={text}
            fixWidth={false}
            fill={'white'}
            fontFamily={'Raleway'}
            fontSize={60}
            textAlign={'center'}
            textWrap={true}
            maxWidth={800}
        />;
        layout.add(tpwrt);
        yield* typewriter().typewrite(vel);
        yield* waitFor(timeOut);
        if(remove) layout.removeChildren();
    }
});

/*
export default makeScene2D(function* (view) {
    const typeWrite = createRef<Txt>();
    view.add(
        <Txt
            ref={typeWrite}
            fontSize={60}
            fill={'white'}
            textAlign={'center'}
            textWrap={true}
            maxWidth={750}
        ></Txt>
    );

    yield* write('Hi', 0.1);
    yield* waitFor(0.7);
    yield* write("You may be wondering...", 0.1);
    yield* waitFor(1);
    yield* write("What's the difference between a Bubble Sort and a Quicksort Algorithm?", 0.1);
    yield* waitFor(1.5);
    
    function* write(text: string, timeOut: number) {
        for(let i = 0; i <= text.length; i++) {
            typeWrite().text(text.substring(0, i));
            yield* waitFor(timeOut);
        }
    }
});
*/