# responsive-components-case-study

## The Problem

At a recent meeting with the frontend developers we discussed the following question: "How should our components handle responsiveness?"

Here are the three main approaches:

1. Components know how to be responsive, i.e. they can be responsive in isolation.
2. Components are not responsive in isolation. Parent components control the responsiveness of their children.
3. Some mixture of the two approaches above.

To really understand this question, I implemented a small portion of the homepage for [gov.uk](https://gov.uk). My design makes simplifications where necessary so as to only focus on the responsiveness problem (ex. I do not have a magnifying glass icon in my search bar)

My implementation has a single breakpoint at 769px, i.e. there are two main views a user can see. The layout for tablet devices and smaller or the layout for devices larger than tablets.

__Layout for tablet and smaller__
![tabler and smaller](https://user-images.githubusercontent.com/5312329/30522916-03976d04-9bd8-11e7-99a4-0502667da7bc.png)

__Layout for larger than tablet__
![image](https://user-images.githubusercontent.com/5312329/30522923-2993a194-9bd8-11e7-8c93-575a1ef73a6b.png)

## The Challenge
Now with a good understanding of what the final design should be, here are the rules/guidelines I set up for myself for the implementation:

1. Use a design system to build the page. This means...
    1. Everything should fit to a grid (gov.uk is built on a 10px grid)
    2. Components that contain gov.uk data MUST be a composition of components from the design system. (i.e. creating one-off wrappers/components with styled-components is not allowed)[[1]](#footnotes)
    3. Applying custom CSS to a component is not strictly disallowed, but it is not encouraged (use props instead)
2. Responsiveness must be done with CSS and not JS. (Using JS for responsiveness means the component cannot be rendered properly with SSR or static rendering)[[2]]((#footnotes))

## The Design System
The design system I built is not a complete design system. I've only added the components that were required to build the page. Here is a list of the components with a short description of what each does.

Note: A lot of the inspiration for the `props` that the components expose is inspired by the project [rebass](https://github.com/jxnblk/rebass). This will be explained in more detail later.

### Utils

#### `BaseStyles`
A div that passes styles to it's children. For example `color`, `font-family`, etc.

### Layouts

#### `ColumnDrop/Column`
The implementation of this component is inspired from this [article about responsive layout patterns](https://developers.google.com/web/fundamentals/design-and-ui/responsive/patterns) by Google. Read it if you haven't! It's short!

`ColumnDrop` and `Column` are used to have multiple columns next to each other in a row on larger screens, but vertically stacked columns on smaller screens.

#### `Container`
A `div` used for padding so components don't need to add padding themselves.

#### `Spacer`
A `div` used for margins so components don't need to add margins themselves.

#### `WebpageLayout`
I couldn't find a name for this pattern, but a super common pattern for web pages is to have a container of centered content whose width is the minimum between 100% of the viewport and a specified max-width (1020px for example, usually something that makes sense for desktops and prevents layouts from stretching too much on very large screens).

### Atoms

#### `Text`
Component for typography. Using this component makes it easier to follow the defined typescale of the project.

#### `LinkMenu/Link`
Has the same props as `Text`, but used for creating a menu with links inside.

#### `Input`
A text input

## The Code

Note: All of the code shown here is also inside of this repository, although you may need to look for the right commit.

Instead of jumping straight to the end result, we'll look at the code in stages. I started by implementing just the _tablet and smaller_ layout.

```js
// commit 265f47d0d953dd9dee682408a7073e12ca81c8b8
// message: refactor and move gov.uk stuff into components
// pages/index.js

<BaseStyles>
  <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
    <Spacer bottom={3}>
      <WelcomeSection />
    </Spacer>
    <PopularLinks />
  </WebpageLayout>
</BaseStyles>
```

The code here is more or less straightforward. We're using `WebpageLayout` as the main container for the content and inside we're rendering our two sections from gov.uk. First we have `WelcomeSection` and then after `PopularLinks`.

You might be asking yourself, "What is `bottom`? Why does `padding` accept an array? Why are we passing numbers to these props?"

Since `Spacer` is only used for margins, the `bottom` prop maps to the css rule `margin-bottom`. Likewise, `padding` maps to the css rule `padding`. The reason why we pass numbers is because the components are aligned to our 10px grid. That means `bottom={3}` will produce the rule `margin-bottom: 30px;` and `padding={[2.5, 2, 0, 2]}` will produce the rule `padding: 25px 20px 0 20px;`

Here's a gif of what we have so far:

![resizing tablet only layout](https://media.giphy.com/media/l378duDb8LeejNIPe/giphy.gif)

Hmmm not so responsive. Let's take a look at the final design so we have an idea of the responsive behaviour we need to code.

![resizing final layout](https://media.giphy.com/media/3ov9jCOnVy5U12MECI/giphy.gif)

After taking a close look at the gif above (or the screenshots shown in the beginning), here are the things that we can see are responsive:

- [ ] The following copy all appear larger on larger screens:
  - Welcome to GOV.UK
  - description after Welcome to GOV.UK
  - Popular on GOV.UK
  - link navigation after Popular on GOV.UK
- [ ] The _Welcome_ section and the _Popular Links_ section are stacked vertically on smaller screens and side-by-side on larger screens
- [ ] The _Welcome_ section has no right margin on smaller screens and does have a right margin on larger screens
- [ ] The _Popular Links_ section has only bottom padding on smaller screens and padding all around on larger screens
- [ ] The _Popular Links_ section has a blue background on smaller screens and a black background on larger screens

### Responsive Text

First let's take a look at our non-responsive versions of `WelcomeSection` and `PopularLinks`.

```js
// commit 265f47d0d953dd9dee682408a7073e12ca81c8b8
// message: refactor and move gov.uk stuff into components
// components/welcome-section.js

<Container className={className}>
  <Spacer bottom={1.5}>
    <Text size='size2' bold>Welcome to GOV.UK</Text>
  </Spacer>
  <Spacer bottom={2}>
    <Text size='sizen1'>The best place to find government services and information</Text>
    <Text size='sizen1' bold>Simpler, clearer, faster</Text>
  </Spacer>
  <Input placeholder='Search GOV.UK' />
</Container>
```

```js
// commit 265f47d0d953dd9dee682408a7073e12ca81c8b8
// message: refactor and move gov.uk stuff into components
// components/popular-links.js

<Container className={className} bottom={2}>
  <Spacer bottom={0.5}>
    <Text size='sizen3'>Popular on GOV.UK</Text>
  </Spacer>
  <LinkMenu size='sizen2' bold>
    <Link href='#'>Universal Jobmatch job search</Link>
    <Link href='#'>Renew vehicle tax</Link>
    <Link href='#'>Log in to student finance</Link>
    <Link href='#'>Book your theory test</Link>
    <Link href='#'>Personal tax account</Link>
  </LinkMenu>
</Container>
```

Once again, these components are more or less straightforward. As a side note, the _n_ in the values `sizen1`, `sizen2`, etc. stands for _negative_. So the size of the text is smaller than the base size which is represented with the value `size0`.

Let's make these responsive!

```diff
commit 6b17f98802fa8b00f1c802c3bfe7887d94d43c1a
make text in welcome section responsive

--- a/components/welcome-section.js
+++ b/components/welcome-section.js

   <Container className={className}>
     <Spacer bottom={1.5}>
-      <Text size='size2' bold>Welcome to GOV.UK</Text>
+      <Text breakpoint='tablet' size={['size2', 'size3']} bold>
+        Welcome to GOV.UK
+      </Text>
     </Spacer>
     <Spacer bottom={2}>
-      <Text size='sizen1'>The best place to find government services and information</Text>
-      <Text size='sizen1' bold>Simpler, clearer, faster</Text>
+      <Text breakpoint='tablet' size={['sizen1', 'size1']}>
+        The best place to find government services and information
+      </Text>
+      <Text breakpoint='tablet' size={['sizen1', 'size1']} bold>
+        Simpler, clearer, faster
+      </Text>
     </Spacer>
     <Input placeholder='Search GOV.UK' />
   </Container>
```

```diff
commit 7ac7e53ee08f27b231711d1bd36ecd42bdbb2d78
make text in popular-links responsive

--- a/components/popular-links.js
+++ b/components/popular-links.js

   <Container className={className} bottom={2}>
     <Spacer bottom={0.5}>
-      <Text size='sizen3'>Popular on GOV.UK</Text>
+      <Text breakpoint='tablet' size={['sizen3', 'sizen2']}>
+        Popular on GOV.UK
+      </Text>
     </Spacer>
-    <LinkMenu size='sizen2' bold>
+    <LinkMenu breakpoint='tablet' size={['sizen2', 'size0']} bold>
       <Link href='#'>Universal Jobmatch job search</Link>
       <Link href='#'>Renew vehicle tax</Link>
       <Link href='#'>Log in to student finance</Link>
```

Try to soak in what's happening by just reading the diff. Though if it's confusing, here's a more detailed explanation of how the responsiveness works.

Our responsive components now accept a prop `breakpoint`. In this case the value `tablet` represents the media query `@media screen and (min-width: 769px)`.

We've also changed `size` to accept an array of strings. In this case, the first value represents the default size and the second value represents the size after the first breakpoint.

I.e. the combination of `breakpoint='tablet'` and `size={['size2', 'size3']}` would eventually produce some CSS that looks like this:

```css
font-size: 32px;
line-height: 35px;

@media screen and (min-width: 769px) {
  font-size: 48px;
  line-height: 50px;
}
```

Fun fact, if we needed more breakpoints, all we have to do is add more breakpoints and more sizes! For example `breakpoint={['phone', 'tablet']}` and `size={['size1', 'size2', 'size3']}` would result in:

```css
font-size: 16px;
line-height: 20px;

@media screen and (min-width: 421px) {
  font-size: 32px;
  line-height: 35px;
}

@media screen and (min-width: 769px) {
  font-size: 48px;
  line-height: 50px;
}
```

This concept of passing in a breakpoint and an array of values is the basis of how we're going to do responsiveness for any component. It's a super powerful concept! Unfortunately I'm not that inventive/clever and I stole this pattern from the project [rebass](https://github.com/jxnblk/rebass).

Let's take a look at what we've got so far.

![responsive text gif](https://media.giphy.com/media/l1J9F87mn3ANznyrm/giphy.gif)

- [x] ~The following copy all appear larger on larger screens:~
  - ~Welcome to GOV.UK~
  - ~description after Welcome to GOV.UK~
  - ~Popular on GOV.UK~
  - ~link navigation after Popular on GOV.UK~
- [ ] The _Welcome_ section and the _Popular Links_ section are stacked vertically on smaller screens and side-by-side on larger screens
- [ ] The _Welcome_ section has no right margin on smaller screens and does have a right margin on larger screens
- [ ] The _Popular Links_ section has only bottom padding on smaller screens and padding all around on larger screens
- [ ] The _Popular Links_ sections has a blue background on smaller screens and a black background on larger screens

### Responsive layout with ColumnDrop

As I mentioned above, this type of responsive layout is a well understood pattern. So I'll say it again, go read this [article](https://developers.google.com/web/fundamentals/design-and-ui/responsive/patterns) by Google!

Here's our homepage using the `ColumnDrop` and `Column` components.

```diff
commit 88cc4b61e7de912a2ab8d6a2e944901cf8c838a4
implement column drop

--- a/pages/index.js
+++ b/pages/index.js

   <BaseStyles>
     <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
-      <Spacer bottom={3}>
-        <WelcomeSection />
-      </Spacer>
-      <PopularLinks />
+      <ColumnDrop breakpoint='tablet'>
+        <Column width='66.66%'>
+          <Spacer bottom={3}>
+            <WelcomeSection />
+          </Spacer>
+        </Column>
+        <Column width='33.33%'>
+          <PopularLinks />
+        </Column>
+      </ColumnDrop>
     </WebpageLayout>
   </BaseStyles>
```

Ok so there should be some familiar concepts going on here. It's our `ColumnDrop` component that accepts a `breakpoint` prop, but now it's the ColumnDrop's children who need to be responsive. That is, we've wrapped the `WelcomeSection` and `PopularLinks` components with the `Column` components and the width of the columns will change depending on the screen size.

This is done with the prop `width` inside of the `Column` components. It's assumed that before the breakpoint we want `width: 100%` and that after the breakpoint we'll use the value inside of the `width` prop.

> WARNING: This API changes in later commits, but I was too lazy to go back and clean this up. The main concepts don't really change though. You'll see the code later so hopefully it's not a big deal.

If we look at our first `Column` component, this is the CSS that would be produced:

```css
width: 100%;

@media screen and min-width(769px) {
  width: 66%;
}
```

And here's how it looks:

![layout with column drop](https://media.giphy.com/media/3o7aD9amQYxz0KOHrW/giphy.gif)

- [x] ~The following copy all appear larger on larger screens:~
  - ~Welcome to GOV.UK~
  - ~description after Welcome to GOV.UK~
  - ~Popular on GOV.UK~
  - ~link navigation after Popular on GOV.UK~
- [x] ~The _Welcome_ section and the _Popular Links_ section are stacked vertically on smaller screens and side-by-side on larger screens~
- [ ] The _Welcome_ section has no right margin on smaller screens and does have a right margin on larger screens
- [ ] The _Popular Links_ section has only bottom padding on smaller screens and padding all around on larger screens
- [ ] The _Popular Links_ sections has a blue background on smaller screens and a black background on larger screens

### Other Responsive Properties

These last few responsive properties are a bit tricky to implement. I would make the argument that the last three items in our responsive TODO list are neither responsive properties of `WelcomeSection`/`PopularLinks` nor a responsive layout. Instead, they are responsive properties of the containers that wrap `WelcomeSection`/`PopularLinks`.

Does this mean we need a responsive `Container` component? Well... we have this already! `Column` is already acting as our  wrapper and it's already responsive. We just need to pass in some props so that it can change other things like `margin`, `padding`, and `background-color` based off the screen size.

```diff
commit 7605e975d017546339e2b6503134a7011ad0b070
use responsive properties in gov.uk layout

--- a/pages/index.js
+++ b/pages/index.js

   <BaseStyles>
     <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
       <ColumnDrop breakpoint='tablet'>
-        <Column width='66.66%'>
+        <Column
+          size={['full', '66.66%']}
+          margin={[
+            [0],
+            [0, 3, 0, 0]
+          ]}
+        >
           <Spacer bottom={3}>
             <WelcomeSection />
           </Spacer>
         </Column>
-        <Column width='33.33%'>
+        <Column
+          size={['full', 'remaining']}
+          padding={[
+            [0, 0, 2, 0],
+            [2]
+          ]}
+          margin={[
+            [0],
+            [0.5, 0, 0, 0]
+          ]}
+          responsiveCSS={['', 'background-color: black;']}
+        >
           <PopularLinks />
         </Column>
       </ColumnDrop>
```

Before we break down what's going on with these props, it might be helpful to start by just looking at the CSS that would be produced. Let's take a look at the CSS for the second column:

```css
  width: 100%;
  margin: 0;
  padding: 0 0 20px 0;

  @media screen and min-width(769px) {
    flex: 1;
    margin: 5px 0 0 0;
    padding: 20px;
    background-color: black;
  }
```

Hopefully this is all coming together now, but just in case we'll talk about the props in more detail.

To start, you'll notice that I've made some changes to the `width` prop. I've changed it so it accepts an array of values, this is so it is consistent with how all the other responsive props work. I've also renamed the prop from `width` to `size`. The reason for this is because I think that if a prop shares the same name as a CSS property i.e. `width`, then it's behaviour should more or less be identical.

In this case, `size` can accept values `'full'` or `'remaining'` which don't have a meaning in traditional CSS but in this case `full` translates to `width: 100%;` and `remaining` to `flex: 1;`.

The other responsive props we have are `padding`, `margin`, and `responsiveCSS`. `padding` and `margin` should be understandable based off of what we've already seen.

But why have we put the implementation for changing the `background-color` inside of `responsiveCSS`?

The reason for that is because `Column` is inherently supposed to be just a container/wrapper. For me, paddings and margins are the responsibility of a container. As well, we want all of our paddings and margins to conform to our 10px grid, so it's nice that we can pass numbers that represent the coefficients.

`responsiveCSS` is supposed to be an escape hatch of sorts. There are inevitably going to be different style rules you want to apply at different screen sizes, but it might not make sense to have a prop for each one of these.

Imagine if our `Column` component could accept props like `backgroundColor`, `boxShadow`, `display`, etc. The list goes on and on. Basically you would keep adding new props everytime you needed to control a different CSS property. In my opinion it's easier to just provide this escape hatch and tell developers to use it with caution. And that 90% of the time the components in our design system should allow you to accomplish the responsive behaviour you need with just props.

You've seen this before, but let's take a look again at the gif of our final implementation :)

![resizing final layout](https://media.giphy.com/media/3ov9jCOnVy5U12MECI/giphy.gif)

- [x] ~The following copy all appear larger on larger screens:~
  - ~Welcome to GOV.UK~
  - ~description after Welcome to GOV.UK~
  - ~Popular on GOV.UK~
  - ~link navigation after Popular on GOV.UK~
- [x] ~The _Welcome_ section and the _Popular Links_ section are stacked vertically on smaller screens and side-by-side on larger screens~
- [x] ~The _Welcome_ section has no right margin on smaller screens and does have a right margin on larger screens~
- [x] ~The _Popular Links_ section has only bottom padding on smaller screens and padding all around on larger screens~
- [x] ~The _Popular Links_ sections has a blue background on smaller screens and a black background on larger screens~

Awesome we did it! It's totally responsive! And we followed all of the rules/guidelines! That means that we have a design system that is comprehensive enough to allow you to implement this (partial) page!

## Who owns responsiveness?

Let's take a look again at the three approaches we said we could use:

1. Components know how to be responsive, i.e. they can be responsive in isolation.
2. Components are not responsive in isolation. Parent components control the responsiveness of their children.
3. Some mixture of the two approaches above.

I would argue that our implementation is either approach number 1 or 3. It's certainly not approach number 2. We're using `Text` as a responsive component both inside `WelcomeSection` and `PopularLinks`. If we wanted our implementation to be even more approach number 1ish, we could change `background-color` between blue and black inside `PopularLinks`.

But let's take a look at these more closely.

### Approach 1: components know how to be responsive

Refactoring our code to be more approach 1ish isn't so difficult.

```diff
--- i/pages/index.js
+++ w/pages/index.js

   <BaseStyles>
     <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
       <ColumnDrop breakpoint='tablet'>
         <Column
           size={['full', '66.66%']}
           margin={[
             [0],
             [0, 3, 0, 0]
           ]}
         >
           <Spacer bottom={3}>
             <WelcomeSection />
           </Spacer>
         </Column>
         <Column
           size={['full', 'remaining']}
-          padding={[
-            [0, 0, 2, 0],
-            [2]
-          ]}
           margin={[
             [0],
             [0.5, 0, 0, 0]
           ]}
-          responsiveCSS={['', 'background-color: black;']}
         >
           <PopularLinks />
         </Column>
       </ColumnDrop>
     </WebpageLayout>
   </BaseStyles>
```

```diff
--- i/components/popular-links.js
+++ w/components/popular-links.js

-  <Container className={className}>
+  <Container
+    className={className}
+    breakpoint='tablet'
+    padding={[
+      [0, 0, 2, 0],
+      [2]
+    ]}
+    responsiveCSS={['', 'background-color: black;']}
+  >
     <Spacer bottom={0.5}>
       <Text breakpoint='tablet' size={['sizen3', 'sizen2']}>
         Popular on GOV.UK
       </Text>
     </Spacer>
     <LinkMenu breakpoint='tablet' size={['sizen2', 'size0']} bold>
       <Link href='#'>Universal Jobmatch job search</Link>
       <Link href='#'>Renew vehicle tax</Link>
       <Link href='#'>Log in to student finance</Link>
       <Link href='#'>Book your theory test</Link>
       <Link href='#'>Personal tax account</Link>
     </LinkMenu>
   </Container>
```

This is fine. In fact, I don't have a responsive `Container` component implemented, this is just how the usage would look. What this comes down to is, "is the background-color inherently a part of the components design?"

If the answer is yes, then maybe this is a good choice. If the answer is no, for example we plan on reusing this component but with a green background, then this component would need to be refactored.

We also needed to move the padding into `PopularLinks` as well to get this to work, which might also not be ideal. Again, it just depends on how you interpret the responsibilities of the component.

### Approach 2: components are not responsive in isolation

The refactor here also isn't so much work. For demonstrative purposes I've chosen to show only `WelcomeSection`.

```diff
--- i/pages/index.js
+++ w/pages/index.js

   <BaseStyles>
     <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
       <ColumnDrop breakpoint='tablet'>
         <Column
           size={['full', '66.66%']}
           margin={[
             [0],
             [0, 3, 0, 0]
           ]}
         >
           <Spacer bottom={3}>
-            <WelcomeSection />
+            <WelcomeSection
+              breakpoint='tablet'
+              titleSize={['size2', 'size3']}
+              descriptionSize={['sizen1', 'size1']}
+            />
           </Spacer>
         </Column>
         <Column
           size={['full', 'remaining']}
           padding={[
             [0, 0, 2, 0],
             [2]
           ]}
           margin={[
             [0],
             [0.5, 0, 0, 0]
           ]}
           responsiveCSS={['', 'background-color: black;']}
         >
           <PopularLinks />
         </Column>
       </ColumnDrop>
     </WebpageLayout>
   </BaseStyles>
```

```diff
--- i/components/welcome-section.js
+++ w/components/welcome-section.js

-const WelcomeSection = ({ className }) => (
+const WelcomeSection = ({
+  className,
+  breakpoint,
+  titleSize,
+  descriptionSize
+}) => (
   <Container className={className}>
     <Spacer bottom={1.5}>
-      <Text breakpoint='tablet' size={['size2', 'size3']} bold>
+      <Text breakpoint={breakpoint} size={titleSize} bold>
         Welcome to GOV.UK
       </Text>
     </Spacer>
     <Spacer bottom={2}>
-      <Text breakpoint='tablet' size={['sizen1', 'size1']}>
+      <Text breakpoint={breakpoint} size={descriptionSize}>
         The best place to find government services and information
       </Text>
-      <Text breakpoint='tablet' size={['sizen1', 'size1']} bold>
+      <Text breakpoint={breakpoint} size={descriptionSize} bold>
         Simpler, clearer, faster
       </Text>
     </Spacer>
```

This wasn't so bad, but I would argue that this type of solution is not very scalable. Imagine your component had a lot more children that needed to be responsive. You could end up with a list of props like `textThingSize`, `otherTextThingSize`, `containerForSomeStuffPadding`, `otherContainerForSomeStuffPadding`, etc.

As well, it makes it a lot more difficult for designers to use the component. How would you explain to a designer, "There's no mobile version of this component. Well there is... because it depends on where it is rendered... but it's the parent who controls how it is rendered. Anyways if you want to preview the mobile version of this component you should render it with these props."

#### How to build a design system with USA Today

I watched a youtube video recently about how USA Today created their design system.

There's a slide in the presentation that explains how modules/components in their design system will give them better reusability.

[![image](https://user-images.githubusercontent.com/5312329/30525318-59009956-9c04-11e7-991a-447ced7e762e.png)](https://youtu.be/WsfK5rccXr4?t=8m40s)

> ### Our new focus: reusability
> 1. Smarter _Modules_:
>     - To do the same job in different places
>     - To do the same job across use cases
> 2. Smarter _Styles_:
>     - To use across these modules and keep them cohesive

This is exactly what we're trying to do with our design system! Later in the presentation, the speaker mentions the documentation they've created for their modules. Specifically, here are the questions that the documentation must answer:

[![image](https://user-images.githubusercontent.com/5312329/30525303-24b7138c-9c04-11e7-9fec-32d734aad194.png)](https://www.youtube.com/watch?v=WsfK5rccXr4&feature=youtu.be&t=12m28s)

> - What is it called?
> - What is it made out of?
> - What variants are needed?
> - How does it scale?
> - What style variables are in use?

So you could imagine answering some of these questions already for the components we created in our implementation of gov.uk. There is however one of these questions that becomes a lot more difficult to answer, "How does it scale?". The only reasonable way to answer this question is if the component itself knows how it should scale.

## Conclusions
Making a design system that supports responsive components isn't trivial. But to answer the original question, "How should our components handle responsiveness?"

I would say that the design system should have atoms and layouts that make it easy to code responsive behaviour. From there we want to build components that know how to be responsive, but we can selectively choose what responsive behaviour the component is responsible for.

So if you made it this far thank you!

One thing I didn't mention in this post was the implementation of the components in the design system that can be responsive. The code in this repository isn't the prettiest and needs a bit of refactoring, overall though I'd say it's solidish. Anyways what we really care about are the APIs that the components expose more so than if the implementation is perfect (implementations may change in the future anyways).

If this stuff interests you I encourage you to try and implement the responsive components yourself first! This also gives you an opportunity to think about what API you want to expose and the different choices you have to make.

## Footnotes
1. Why is it bad to create one-off components? For me this is a sign that the design system is not working well. It means that the design system is not supporting something you want to do, so you have to create it yourself.
2. I am defining "using JS for responsivess" as "using the `window` object to implement render logic depending on the screen size". This does not work in SSR nor static rendering because, in a server or in a static build, you do not have access to the `window` object.
