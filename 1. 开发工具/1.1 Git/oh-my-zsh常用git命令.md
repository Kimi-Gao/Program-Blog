> https://github.com/muwenzi/Program-Blog/issues/4

## Aliases

[完整版](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git)

| Alias | Command |
| :-- | :-- |
| ga | git add |
| 【gaa】 | git add --all |
| gapa | git add --patch |
| gb | git branch |
| 【gba 】 | git branch -a |
| gbr | git branch --remote |
| 【gcam】 | git commit -a -m |
| 【gcb】 | git checkout -b  新建一个开发分支myfeature |
| gcf | git config --list |
| gcl | git clone --recursive |
| 【gcm】 | git checkout master |
| gcmsg | git commit -m |
| 【gco】 | git checkout |
| gcs | git commit -S |
| gd | git diff |
| gdca | git diff --cached |
| gdt | git diff-tree --no-commit-id --name-only -r |
| gdw | git diff --word-diff |
| gf | git fetch |
| gfa | git fetch --all --prune |
| gfo | git fetch origin |
| gg | git gui citool |
| gga | git gui citool --amend |
| ggpull | ggl |
| ggpur | ggu |
| ggsup | git branch --set-upstream-to = origin/$(current_branch) |
| gpsup | git push --set-upstream origin $(current_branch) |
| 【gl 】 | git pull |
| glo | git log --oneline --decorate --color |
| 【 glol 】 | git log --graph --pretty = format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit |
| glola | git log --graph --pretty = format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all |
| gm | git merge |
| gmom | git merge origin/master |
| gmt | git mergetool --no-prompt |
| gmtvim | git mergetool --no-prompt --tool = vimdiff |
| gmum | git merge upstream/master |
| 【gp  】 | git push |
| gpd | git push --dry-run |
| gpoat | git push origin --all && git push origin --tags |
| gpu | git push upstream |
| gpv | git push -v |
| gr | git remote |
| gra | git remote add |
| grb | git rebase |
| grba | git rebase --abort |
| grbc | git rebase --continue |
| grbi | git rebase -i |
| grbm | git rebase master |
| grbs | git rebase --skip |
| grh | git reset HEAD |
| grhh | git reset HEAD --hard |
| grmv | git remote rename |
| grrm | git remote remove |
| grset | git remote set-url |
| gru | git reset -- |
| grup | git remote update |
| grv | git remote -v |
| gsb | git status -sb |
| gss | git status -s |
| 【gst】 | git status |
| gsta | git stash |
| gstaa | git stash apply |
| gstd | git stash drop |
| gstl | git stash list |
| gstp | git stash pop |
| gsts | git stash show --text |
| gsu | git submodule update |
| gts | git tag -s |
| gunignore | git update-index --no-assume-unchanged |
| gup | git pull --rebase |
| gupv | git pull --rebase -v |
| glum | git pull upstream master |
| gvt | git verify-tag |
| gwch | git whatchanged -p --abbrev-commit --pretty = medium |
| gwip | git add -A; git rm $(git ls-files --deleted) 2> /dev/null; git commit -m "--wip--" |
## Deprecated Aliases

These are aliases that have been removed, renamed, or otherwise modified in a way that may, or may not, receive further support.

| Alias | Command | Modification |
| :-- | :-- | --- |
| gap | git add --patch | new alias `gapa` |
| gcl | git config --list | new alias `gcf` |
| gdc | git diff --cached | new alias `gdca` |
| gdt | git difftool | no replacement |
| ggpur | git pull --rebase origin $(current_branch) | new alias `ggu` (`ggpur` still exists for now though) |
| ggpush | git push origin $(current_branch) | new alias `ggp` (`ggpush` still exists for now though) |
| gk | gitk --all --branches | now aliased to `\gitk --all --branches` |
| glg | git log --stat --max-count = 10 | now aliased to `git log --stat --color` |
| glgg | git log --graph --max-count = 10 | now aliased to `git log --graph --color` |
| gwc | git whatchanged -p --abbrev-commit --pretty = medium | new alias `gwch` |
| gwip | git add -A; git ls-files --deleted -z | xargs -r0 git rm; git commit -m "--wip--" | now aliased to `git add -A; git rm $(git ls-files --deleted) 2> /dev/null; git commit -m "--wip--"` |
## Functions
### Current

| Command | Description |
| :-- | :-- |
| current_branch | Return the name of the current branch |
| current_repository | Return the names of the current remotes |
| git_current_user_name | Returns the `user.name` config value |
| git_current_user_email | Returns the `user.email` config value |
