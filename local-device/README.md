# 本地端源码归档

本目录保存当前安装中实际生效的 22 个定制源码文件：设备桥接、聊天/测试/工作台页面、启动脚本，以及 AIRI 内的 AKS/Gogh 渲染模块。`manifest.json` 记录原文件摘要，供同步与恢复校验。云端源码仍以 `cloud/aks-tencent` 为准。

今后修改本地功能，优先修改仓库内源码并部署；临时直接修改安装目录后，必须重新执行归档命令，避免 GitHub 与运行版本不同：

```powershell
node scripts/sync-local-source.mjs "C:/Users/linbowen/Documents/AKS-Windows-本地端"
```

`research/aks-autonomy/prototype` 保留开发代码；本目录是当前安装版本的精确源码快照，避免尚未部署的开发改动覆盖运行版本。AIRI 内嵌模块也已归档，不需要把约 600MB 的 app.asar 提交 Git。

## 在其他电脑恢复

先安装兼容的、已包含 AKS/Gogh 集成的 AIRI，以及 Node 运行时和所需模型。这个仓库不包含这些第三方程序或模型。设备需重新授权，配置本机 `client/cloud/secrets`、工作台私密配置和 `AKS_SERVER_HOST`；不要从 GitHub 复制设备私钥。

原内嵌模块有三个账号绑定值，已替换为 `manifest.json` 中的占位符。在仓库的 `local-private/bindings.json`（已忽略）中填写对应私密值，键名与占位符一致。同一值跨模块复用同一个键。各键用途可在 `airi-assets` 源码中定位，不在公共仓库存放账号。

```powershell
node scripts/restore-local-source.mjs "D:/AKS-Windows-本地端" "local-private/bindings.json"
# 校验通过后，退出 AIRI 和设备桥接，再执行：
node scripts/restore-local-source.mjs "D:/AKS-Windows-本地端" "local-private/bindings.json" --apply
```

恢复器先校验所有摘要和绑定配置，再备份原代码与 app.asar。只覆盖列出的源码，不改云端、角色库、聊天或工作数据库。启动前配置服务器地址。当前卡应绑定内置模型 `preset-gogh-aks-slot0`（Gogh · Aks 灰白发风衣），从而启用已有动作适配；补光值已包含在归档的 gogh-ui.js 中。

角色卡本身、AIRI 窗口位置/用户偏好、模型资产、设备授权、数据库和聊天记录属于独立用户数据，未进入 Git。恢复这些数据需另做私人备份；本目录不是完整安装包。
