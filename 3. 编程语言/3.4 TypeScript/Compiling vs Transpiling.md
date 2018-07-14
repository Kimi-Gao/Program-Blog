尽管术语“traspiling"从上世纪就已经出现了，但是似乎对于它到底是什么意思以及”transpiling"和“compiling"有什么区别仍然存在很多疑惑。
首先，transpiling是一种特殊的compiling。这很有助于让我们了解到我们是在谈论差不多类似的东西，实际上它就是一种很特别的编译。但区别于通常意义的编译我们该如何定义它呢？
Compiling这个术语通常是将一种语言编写的源代码转换为另一种。
Transpiling是一个特定的术语，用于将一种语言编写的源代码转换为另一种具有相同抽象层次的语言。
因此（简单来说）当你编译C#时，编译器将函数体转换为中间语言（IL）。这不能称为transpiling，因为这两种语言的抽象层次完全不同。
当你编译TypeScript时，编译器将它转换为JavaScript。二者的抽象层次相同，所以你可以称之为transpiling。
编译器和transpiler都可以在处理过程中优化代码。
其他一些常见的可以称为transpiling的组合包括C++到C，CoffeeScript到JavaScript，Dart到JavaScript以及PHP到C++。

Despite the fact that the term “transpiling” has been around since last century, there appears to be a fair bit of confusion about what it means and what the difference between transpiling and compiling is.

Firstly, transpiling is a specific kind of compiling. This helps a great deal as we now know we are talking about the same kind of thing. It is actually a specific kind of compiling. So how do we define it compared to the more general term?

Compiling
is the general term for taking source code written in one language and transforming into another
Transpiling
is a specific term for taking source code written in one language and transforming into another language that has a similar level of abstraction
So (simplistically) when you compile C#, your method bodies are transformed by the compiler into IL. This cannot be called transpiling because the two languages are very different levels of abstraction.

When you compile TypeScript, it is transformed by the compiler into JavaScript. These are very similar levels of abstraction, so you could call this transpiling.

Both compilers and transpilers can optimise the code as part of the process.

Other common combinations that can be dubbed as transpiling include C++ to C, CoffeeScript to JavaScript, Dart to JavaScript and PHP to C++.

https://www.stevefenton.co.uk/2012/11/Compiling-Vs-Transpiling/