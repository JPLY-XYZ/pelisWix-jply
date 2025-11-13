#!/bin/bash

# Este script automatiza la descarga de cambios, la instalación de dependencias
# y el inicio de la compilación local EAS para Android.

# --- 1. DESCARGAR CAMBIOS DE GITHUB ---
echo "=========================================="
echo "1. Descargando los últimos cambios (git pull)..."
echo "=========================================="
# El 'set -e' asegura que el script se detenga si este comando falla
set -e
git pull

# Comprobar el código de salida de git pull
if [ $? -ne 0 ]; then
    echo "ERROR: 'git pull' falló. Por favor, resuelve los conflictos o revisa la conexión."
    exit 1
fi
echo "✅ Git pull completado con éxito."


# --- 2. INSTALAR DEPENDENCIAS DE NODE ---
echo ""
echo "=========================================="
echo "2. Instalando o actualizando dependencias (npm i)..."
echo "=========================================="
npm i

# Comprobar el código de salida de npm i
if [ $? -ne 0 ]; then
    echo "ERROR: 'npm i' falló. Revisa tu archivo package.json."
    exit 1
fi
echo "✅ npm i completado con éxito."


# --- 3. INICIAR LA COMPILACIÓN LOCAL EAS ---
echo ""
echo "=========================================="
echo "3. Iniciando la compilación local EAS..."
echo "=========================================="
eas build -p android --profile preview --local

# Comprobar el código de salida de eas build
if [ $? -ne 0 ]; then
    echo "ADVERTENCIA: 'eas build' falló. Revisa los logs de EAS."
    # No salimos con error 1 aquí, pero notificamos el fallo de la compilación
fi

echo "=========================================="
echo "Proceso del script finalizado."
echo "=========================================="
