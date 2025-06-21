from build import build_list_acao
from build import build_list_bdr
from build import build_list_fi_infra
from build import build_list_fia
from build import build_list_fiagro
from build import build_list_fidc
from build import build_list_fii
from build import build_list_fip

def build():
    build_list_acao.create_list()
    build_list_bdr.create_list()
    build_list_fi_infra.create_list()
    build_list_fia.create_list()
    build_list_fiagro.create_list()
    build_list_fidc.create_list()
    build_list_fii.create_list()
    build_list_fip.create_list()
