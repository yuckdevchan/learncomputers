# Style Guide & Philosophy
**Main** points:
- **Guides** should be **short**, **informative**, and **not** get into **unecessary details**, mostly they should **give enough information** so that the **topic makes sense** in the **context of** everything else in **the computer world**.
- **Words** should **often be bolded** to **help guide** the **reader's eye**, allowing them to **read quickly** and extract **important information**.

## Special Markdown Syntax
**Terms** should be **linked**. The **linking system** works as **follows**: if you **link** like this in **markdown**:
```markdown
A [GPU](gpu) is used for [graphics](graphics) processing.
```
Then it will **automatically search** for **any guide** in the **tree structure** that is called **gpu.md** and **graphics.md**. If the **file** doesn't **exist**, it **autolinks to Wikipedia**, replacing your **dashes** (-) with **underscores** (-). You **must** use %20 **currently** to have **spaces** which **may be necessary** for **wikipedia articles**.

It **works** like this so if **an article** doesn't exist then it **links to wikipedia**, but if it is **created at some point**, it can **link to this site**.
