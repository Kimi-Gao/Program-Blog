使用 Shell 脚本来处理 JSON，有以下三种方法：

使用 awk sed
使用第三方库
调用其他脚本解释器

```bash
function get_json_value()
{
  local json=$1
  local key=$2

  if [[ -z "$3" ]]; then
    local num=1
  else
    local num=$3
  fi

  local value=$(echo "${json}" | awk -F"[,:}]" '{for(i=1;i<=NF;i++){if($i~/'${key}'\042/){print $(i+1)}}}' | tr -d '"' | sed -n ${num}p)

  echo ${value}
}
```

```bash
get_json_value $(curl -s http://ip.taobao.com/service/getIpInfo.php?ip=myip) ip
```

https://www.tomczhen.com/2017/10/15/parsing-json-with-shell-script/
