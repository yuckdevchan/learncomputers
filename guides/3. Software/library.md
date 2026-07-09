# Library
A [software library](library%20(computing)) is an item of software which is designed to provide utilities for other software to use.

Libraries do not run by themselves, instead their code is used, or 'imported', by other software.

## Why use libraries?
Because developers don't want to redo something that's already been done before.

Using libraries saves time and effort, allowing for developers to focus on the unique aspects of their software instead of basic functionality.

## Security
Relying on libraries can be a security risk, as if the library has a security vulnerability, it can be exploited to attack software which uses it.

On the other hand, using libraries can make software more secure, as library developers have often spent a lot of time and effort to make their libraries secure, and sometimes have had many people review their code for security vulnerabilities.

## Example use

```python
x = 16
print(f"The square root of {x} is ")
```

In my unfinished python program I want to square root a number. Unfortunately python doesn't include a square root function by default, and writing one myself would be a pain.

Lucky for me, I can simply import the `math` library which includes a square root function:

```python
import math

x = 16
print(f"The square root of {x} is {math.sqrt(x)}")
```

Most of the time when you install python, it comes with the 'math' library, so it can just be imported.

For other libraries, you may need to download them from the internet first. Many languages have their own [package managers](package-manager) which can be used to easily download andinstall libraries from the internet.
