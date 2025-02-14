import {Rect, Layout, Txt, makeScene2D} from '@motion-canvas/2d';
import {createRef, all, easeInOutCubic, waitFor, slideTransition, Direction} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const values = [20, 50, 30, 70, 80, 40, 10, 60];
  const bars = values.map(() => (createRef<Rect>()));
  const iter = createRef<Txt>();
  let it = 0;

  // Add rectangles in the view
  view.add(
    bars.map((bar, i)=>(
      <Layout>
        <Txt
          scale={3}
          fill={'white'}
          y={-300}
          x={0}
          fontFamily={'Raleway'}
          text={'Bubble Sort'}
        />
        <Rect
          ref={bar}
          width={30}
          height={values[i]*5}
          fill={'lightblue'}
          x={-175+(i*50)}
          y={0}
        />
        <Txt
          ref={iter}
          scale={3}
          fill={'white'}
          y={330}
          x={0}
          fontFamily={'Raleway'}
        />
      </Layout>
    ))
  );

  iter().text('Iterations: ' + it);
  yield* slideTransition(Direction.Left, 1);
  yield* waitFor(0.8);
  // Animation bit
  for(let i = 0; i < values.length; i++) {
    for(let j = 0; j < values.length - i - 1; j++) {
      if(values[j] > values[j+1]) {
        // swap value
        it++;
        [values[j], values[j+1]] = [values[j+1], values[j]]
        // swap animation
        iter().text('Iterations: ' + it);
        yield* all(
          bars[j]().position.x(bars[j+1]().position.x(), 0.5, easeInOutCubic),
          bars[j+1]().position.x(bars[j]().position.x(), 0.5, easeInOutCubic),
        );
        // swap reference
        [bars[j], bars[j+1]] = [bars[j+1], bars[j]]
      }
    }
  }

  for(let i = 0; i < bars.length; i++) {
    yield* bars[i]().fill('lightgreen', 0.2, easeInOutCubic);
  }
  yield* waitFor(0.41);
});
