PGDMP  !    -                 |            invoice_and_tracking    13.13 (Debian 13.13-0+deb11u1)    16.0 @               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16384    invoice_and_tracking    DATABASE     |   CREATE DATABASE invoice_and_tracking WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
 $   DROP DATABASE invoice_and_tracking;
                postgres    false                       0    0    DATABASE invoice_and_tracking    ACL     D   GRANT ALL ON DATABASE invoice_and_tracking TO invoice_and_tracking;
                   postgres    false    3082                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    16399    bill_to    TABLE     �   CREATE TABLE public.bill_to (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200)
);
    DROP TABLE public.bill_to;
       public         heap    invoice_and_tracking    false    4            �            1259    16397    bill_to_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bill_to_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.bill_to_id_seq;
       public          invoice_and_tracking    false    203    4                       0    0    bill_to_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.bill_to_id_seq OWNED BY public.bill_to.id;
          public          invoice_and_tracking    false    202            �            1259    16388    company    TABLE     Z  CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200),
    tel character varying(1200),
    fax character varying(1200),
    gst character varying(1200),
    bank_details character varying(1200)
);
    DROP TABLE public.company;
       public         heap    invoice_and_tracking    false    4            �            1259    16386    company_id_seq    SEQUENCE     �   CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.company_id_seq;
       public          invoice_and_tracking    false    201    4                       0    0    company_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;
          public          invoice_and_tracking    false    200            �            1259    16493    daily__account    TABLE     �   CREATE TABLE public.daily__account (
    id character varying(20) NOT NULL,
    purchase_order_id character varying(20),
    all_items character varying(500)
);
 "   DROP TABLE public.daily__account;
       public         heap    invoice_and_tracking    false    4            �            1259    16452    invoice    TABLE     �  CREATE TABLE public.invoice (
    id character varying(20) NOT NULL,
    bill_to_id integer,
    ship_from_id integer,
    ship_to_id integer,
    all_items character varying(10000),
    date timestamp without time zone,
    due_date timestamp without time zone,
    terms character varying(10000),
    extra_info character varying(10000),
    bl_number character varying(10000),
    bank_details character varying(10000),
    type character varying(10000),
    container character varying(10000),
    departure character varying(10000),
    location_status character varying(10000),
    custom_tracking character varying(10000),
    status character varying(10000),
    "Deli" character varying(10000),
    "Manifest" character varying(10000)
);
    DROP TABLE public.invoice;
       public         heap    invoice_and_tracking    false    4            �            1259    16432    item    TABLE     �   CREATE TABLE public.item (
    id integer NOT NULL,
    name character varying(1200),
    description character varying(1200),
    price real,
    currency character varying(1200),
    quantity integer
);
    DROP TABLE public.item;
       public         heap    invoice_and_tracking    false    4            �            1259    16430    item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.item_id_seq;
       public          invoice_and_tracking    false    4    209                       0    0    item_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;
          public          invoice_and_tracking    false    208            �            1259    16475    purchase__order    TABLE     �  CREATE TABLE public.purchase__order (
    id character varying(20) NOT NULL,
    vendor_id integer,
    all_items character varying(500),
    invoice_id character varying(20),
    date timestamp without time zone,
    terms character varying(1200),
    extra_info character varying(1200),
    bl_number character varying(1200),
    bank_details character varying(1200),
    type character varying(1200),
    container character varying(1200),
    departure character varying(1200),
    location_status character varying(1200),
    custom_tracking character varying(1200),
    "BL" character varying(1200),
    "Deli" character varying(1200),
    "Manifest" character varying(1200)
);
 #   DROP TABLE public.purchase__order;
       public         heap    invoice_and_tracking    false    4            �            1259    16410 	   ship_from    TABLE     �   CREATE TABLE public.ship_from (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200)
);
    DROP TABLE public.ship_from;
       public         heap    invoice_and_tracking    false    4            �            1259    16408    ship_from_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ship_from_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.ship_from_id_seq;
       public          invoice_and_tracking    false    205    4                       0    0    ship_from_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.ship_from_id_seq OWNED BY public.ship_from.id;
          public          invoice_and_tracking    false    204            �            1259    16421    ship_to    TABLE     �   CREATE TABLE public.ship_to (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200)
);
    DROP TABLE public.ship_to;
       public         heap    invoice_and_tracking    false    4            �            1259    16419    ship_to_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ship_to_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.ship_to_id_seq;
       public          invoice_and_tracking    false    4    207                       0    0    ship_to_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.ship_to_id_seq OWNED BY public.ship_to.id;
          public          invoice_and_tracking    false    206            �            1259    16443    vendor    TABLE     �   CREATE TABLE public.vendor (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200)
);
    DROP TABLE public.vendor;
       public         heap    invoice_and_tracking    false    4            �            1259    16441    vendor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.vendor_id_seq;
       public          invoice_and_tracking    false    211    4                       0    0    vendor_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.vendor_id_seq OWNED BY public.vendor.id;
          public          invoice_and_tracking    false    210            W           2604    16402 
   bill_to id    DEFAULT     h   ALTER TABLE ONLY public.bill_to ALTER COLUMN id SET DEFAULT nextval('public.bill_to_id_seq'::regclass);
 9   ALTER TABLE public.bill_to ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    202    203    203            V           2604    16391 
   company id    DEFAULT     h   ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);
 9   ALTER TABLE public.company ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    201    200    201            Z           2604    16435    item id    DEFAULT     b   ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);
 6   ALTER TABLE public.item ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    208    209    209            X           2604    16413    ship_from id    DEFAULT     l   ALTER TABLE ONLY public.ship_from ALTER COLUMN id SET DEFAULT nextval('public.ship_from_id_seq'::regclass);
 ;   ALTER TABLE public.ship_from ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    204    205    205            Y           2604    16424 
   ship_to id    DEFAULT     h   ALTER TABLE ONLY public.ship_to ALTER COLUMN id SET DEFAULT nextval('public.ship_to_id_seq'::regclass);
 9   ALTER TABLE public.ship_to ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    207    206    207            [           2604    16446 	   vendor id    DEFAULT     f   ALTER TABLE ONLY public.vendor ALTER COLUMN id SET DEFAULT nextval('public.vendor_id_seq'::regclass);
 8   ALTER TABLE public.vendor ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    211    210    211            �          0    16399    bill_to 
   TABLE DATA           I   COPY public.bill_to (id, name, address1, address2, address3) FROM stdin;
    public          invoice_and_tracking    false    203   IP       �          0    16388    company 
   TABLE DATA           f   COPY public.company (id, name, address1, address2, address3, tel, fax, gst, bank_details) FROM stdin;
    public          invoice_and_tracking    false    201   ES                 0    16493    daily__account 
   TABLE DATA           J   COPY public.daily__account (id, purchase_order_id, all_items) FROM stdin;
    public          invoice_and_tracking    false    214   �T                 0    16452    invoice 
   TABLE DATA           �   COPY public.invoice (id, bill_to_id, ship_from_id, ship_to_id, all_items, date, due_date, terms, extra_info, bl_number, bank_details, type, container, departure, location_status, custom_tracking, status, "Deli", "Manifest") FROM stdin;
    public          invoice_and_tracking    false    212   �T       �          0    16432    item 
   TABLE DATA           P   COPY public.item (id, name, description, price, currency, quantity) FROM stdin;
    public          invoice_and_tracking    false    209   �a                 0    16475    purchase__order 
   TABLE DATA           �   COPY public.purchase__order (id, vendor_id, all_items, invoice_id, date, terms, extra_info, bl_number, bank_details, type, container, departure, location_status, custom_tracking, "BL", "Deli", "Manifest") FROM stdin;
    public          invoice_and_tracking    false    213   Yc       �          0    16410 	   ship_from 
   TABLE DATA           K   COPY public.ship_from (id, name, address1, address2, address3) FROM stdin;
    public          invoice_and_tracking    false    205   vc       �          0    16421    ship_to 
   TABLE DATA           I   COPY public.ship_to (id, name, address1, address2, address3) FROM stdin;
    public          invoice_and_tracking    false    207   �g                 0    16443    vendor 
   TABLE DATA           >   COPY public.vendor (id, name, address1, address2) FROM stdin;
    public          invoice_and_tracking    false    211   �j                  0    0    bill_to_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.bill_to_id_seq', 11, true);
          public          invoice_and_tracking    false    202                       0    0    company_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.company_id_seq', 7, true);
          public          invoice_and_tracking    false    200                       0    0    item_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.item_id_seq', 16, true);
          public          invoice_and_tracking    false    208                       0    0    ship_from_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.ship_from_id_seq', 20, true);
          public          invoice_and_tracking    false    204                       0    0    ship_to_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.ship_to_id_seq', 14, true);
          public          invoice_and_tracking    false    206                       0    0    vendor_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.vendor_id_seq', 1, false);
          public          invoice_and_tracking    false    210            _           2606    16407    bill_to bill_to_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.bill_to
    ADD CONSTRAINT bill_to_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.bill_to DROP CONSTRAINT bill_to_pkey;
       public            invoice_and_tracking    false    203            ]           2606    16396    company company_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.company DROP CONSTRAINT company_pkey;
       public            invoice_and_tracking    false    201            m           2606    16500 "   daily__account daily__account_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.daily__account
    ADD CONSTRAINT daily__account_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.daily__account DROP CONSTRAINT daily__account_pkey;
       public            invoice_and_tracking    false    214            i           2606    16459    invoice invoice_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            invoice_and_tracking    false    212            e           2606    16440    item item_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
       public            invoice_and_tracking    false    209            k           2606    16482 $   purchase__order purchase__order_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.purchase__order
    ADD CONSTRAINT purchase__order_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.purchase__order DROP CONSTRAINT purchase__order_pkey;
       public            invoice_and_tracking    false    213            a           2606    16418    ship_from ship_from_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.ship_from
    ADD CONSTRAINT ship_from_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.ship_from DROP CONSTRAINT ship_from_pkey;
       public            invoice_and_tracking    false    205            c           2606    16429    ship_to ship_to_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.ship_to
    ADD CONSTRAINT ship_to_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.ship_to DROP CONSTRAINT ship_to_pkey;
       public            invoice_and_tracking    false    207            g           2606    16451    vendor vendor_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT vendor_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.vendor DROP CONSTRAINT vendor_pkey;
       public            invoice_and_tracking    false    211            s           2606    16501 4   daily__account daily__account_purchase_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.daily__account
    ADD CONSTRAINT daily__account_purchase_order_id_fkey FOREIGN KEY (purchase_order_id) REFERENCES public.purchase__order(id);
 ^   ALTER TABLE ONLY public.daily__account DROP CONSTRAINT daily__account_purchase_order_id_fkey;
       public          invoice_and_tracking    false    214    213    2923            n           2606    16460    invoice invoice_bill_to_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_bill_to_id_fkey FOREIGN KEY (bill_to_id) REFERENCES public.bill_to(id);
 I   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_bill_to_id_fkey;
       public          invoice_and_tracking    false    203    2911    212            o           2606    16465 !   invoice invoice_ship_from_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_ship_from_id_fkey FOREIGN KEY (ship_from_id) REFERENCES public.ship_from(id);
 K   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_ship_from_id_fkey;
       public          invoice_and_tracking    false    2913    205    212            p           2606    16470    invoice invoice_ship_to_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_ship_to_id_fkey FOREIGN KEY (ship_to_id) REFERENCES public.ship_to(id);
 I   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_ship_to_id_fkey;
       public          invoice_and_tracking    false    207    2915    212            q           2606    16488 /   purchase__order purchase__order_invoice_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchase__order
    ADD CONSTRAINT purchase__order_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoice(id);
 Y   ALTER TABLE ONLY public.purchase__order DROP CONSTRAINT purchase__order_invoice_id_fkey;
       public          invoice_and_tracking    false    2921    212    213            r           2606    16483 .   purchase__order purchase__order_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchase__order
    ADD CONSTRAINT purchase__order_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendor(id);
 X   ALTER TABLE ONLY public.purchase__order DROP CONSTRAINT purchase__order_vendor_id_fkey;
       public          invoice_and_tracking    false    213    2919    211            �   �  x�]SM��H^W��"�
[��v�잡l��Pv��mH�lO�s��Nv�ɜ$+J�A�T�z_����bml^X��H�x� "��D�2�V9�w�y�ul�u2��hrR�қ=��$��b���R(�*T�G�����h��6qa���r����"�_�u�Hirp���|��\7��f����^|�w3�����2
 h;E@��Vr��"U����4T�Bk�q,���{+��1b�S���R]yi��l���r�b�����_�`+]s��M��@v(��~��G�s�]Y��b�gP:�V�H�vk��[H&Φ����0�	m2��B unr)�y��xNiY#��Z��u�H#��U��x��,��Tbsz�D��KW���nN��]���������n�~��`����!�B���Xe���sݶ�p��\�F7XC!dnV*0������蜬2<���F�A1e�WVD^�]s`ڃzT�k�VM��	�m��zlߟx��ǲm*�îl�r�TWUy�?�{�\[�'����ת�[S�<����Z�O�oΗ�pF�
�]L�%��m�MU����k�v�6������m�t��~��7�g(�ۘ�+�V�M��X�_- ����g
I�ed-�l��a&����gzuؾ1%��pp]"�gN;����WJxA%)�����U:��T�3$�j��A���qe�)6�#F�yr�a���qzww��B"=      �   I  x�eQ�n�0<�W��s,l^7B�
5@��V\pb��S)_C*�U��zgggvb����v�c^7yV;��h��`Z����0m�U�3�"��]��*�q2>�	8�I�C��ĖahD���~>��>�<;+&ΐ��Tf) ��]xsC���(�F�f0�� v�QL��؂%�H�N^��Ĕ,�^�K�m �=�U�-������,�����Uk&!3"�����ZO�'	�٤М ����(9�n�� �'� c���Of�K
8�+�b3sq��C70u�6�w^ڨ�p��������ˡ����9����Ҋ�s[���1�v            x������ � �           x��\�n�H}f��� ��f�~Ѿ,Mɖb�F�b{F���J,ġ2��X,�?�?�_�Ք,S����pf�LJM�Yu�ԩ�n�ߢ}�9#
s�:���o�zy1��Oǟ��I���^֮�/���M���^��TT�`�A��z9��7jx��F�3���}{��t|n�
)\����_�h>���1��=�qE��A������7�:���{��Go�"M���I\�e?q���p�a4K^�j�ᲫaEbX�jN��t8%�$��R%�����UʐR��Ŕ��O0¸�O=�0��734���.
.ǟ?���l��<�tp���q���A�j�!�&���ZH�`è�i�!���wڨ�h6;'������Z�Z� B$��� 9��&z��P����Co���#Zp� �>�F�~2���BԆ�����=j����_��f0%_�7���L��0�����X�a䝟O�D� W��,Pp�8�#r1B�Ö��}�	�3�����h:�c,¥X3�=��b:�����mT`V��/��u��d
75qQ�=�Z�G䘸���"D�Kq�i4"���j�X�h�~|>�>+���ڿ��x6���-�V#:_����s�5�S�f����Z8��������[M���a��q�Sx�/_&�3lo�ш1�p#��%�)1�Ā�a��B#K(1�Ā�(i��%(1�Ā?!D0��� !���9�!�!$V�Ld[a4~?�[�g�"��yW�/C�E�oQF0�yw�ID��/�7�%�"�j&��>��D0.�.�����}��%���)�<�tH돃;/|w�&�- �$��i*����{�|&,=�@��Q�����c��SlM�ٚ׽���-k��i'n���	鿡�Z��{b��t��h���4�g1�%Bm58l1[��1�jwܒ�V;pN�*�~P3�X�0�v�,�3�?�BZ-�4�b�0�N�|���@����@��O�n�N*���PSb@0@�Pb��0@b�)~���M���ʒ���M&���u�\]��[&���n��'F=�(�O�!@�ڝ��>6�p���U� ��DV�t���7�Oܫ��1Iâu(F��L"�H@R�-o@��p�#9[��'��4�`�@�(t�0�`�a��T-T��I�|�G%�����<.>X��B4V�����d��"k��� n&�p��B�p9� %0z����;�6�A����C4݃9�{�F5Y���o���w�(݂�kߚ�c7O
��4�K��y�-��X�H���Ӂ�LJa��vx�)F�	��( #.�' ���ъ%!�}�`P��*F��
�0�4�M��~����1?-1� �	�C�r�Chj�ߕ)��{�sԅ�{��&6(�9��NG���u�`�ru�X+�x'��3ۜ��}Q����5:�粮1v;�\`,���#�������~	s�$F�w�a����f����g�C�؇���ˬ�(��$���
���J�A����Ff_�~:���v�:${T��bSI_Ḱ��kRzY����1���o���Q֬��tV��K�2�?�Z��ZJ�kk�gg��7�c� � >%!\����d\	8"b ���p2S��8 ݴ.A�[k���c�f{C�H�;�[��{�h�k=t�[��^ ��ͭ�cN�B-��i�{91Z)]Zp�,X)ah��\�
U��bBZw&-ń�eZ+�Y\��o�m����<�p<MOn��*��c�ORN�fKW��ͣ��J+-DI��UIN��Hb: q���{�O��F�O�իA7�*�F��d�<S ����⺺72{55��x_bYHaj�W��R��+� ) @�%�^�P@{�s�o0�%�H	wu#-�v��Q�$w9��"�]V�Z
"�rm$d-��:�,��-]��,�O�-]��DJa��Uɲ����Y[����������c1@1��/�����$�H�+��5��h��!�`��m�*�d�`��
& s�O�~Fڢ�R� �� %0�e�^��юW��)Ģ�������b]��eW�T
M����O�ܲ�)I��w��`��P�4���[�6��خ��%�G����C�M��y�߆W_G3���V�*���?�����&~#�����_� .m�U��L��:Di����Ap��Ms)�6ϴ�/���.z�>����	E9����=���U�Y�wB��cJ;+�#�,���F�V��Z�b��5�4���c�}����*1L�ׯ����h4�q-���Zm�(w����dz��5��'��r�%�M���4򉐷�J�,^�1I(N��p�ؖ�eE�vj`�*�L4�JęƢ�X"W}sZ[��Z��M"�ސ�U)��n.���zBք(���}^��zEnx��.��)l�-��jkVBp%��L�!Xp�l) 0�{��;��.���u�9��������(L�7dJ�i����A~S����h�	�7�8<E'��1zhǔ�]�`P���� �j�`V���P`Qc+Sr�Be[��2q�a�}�r/�|ktv���,���<~�G5��dcaģ������}4����>�����=I)�@��U�OlIgeM�&ZM��XW�q)�I~B3ͱc�N���aV>E���_�U.��^0{D��7k� Zo��mKY��!P���jՆ�5Q�A�۪��p�^��[����n��^m�7�Q7 �^������U��)i�
iO8�@d߇�?���"Exa闊#���Pv��c�\"l�X�X�MA-��g���f;^&���;��f����2%b'�#��[���!�5�r3���o�r[c�wM�'�-��Ď(%�$�n3� ɰ�Z�nA]��8$�b�8C����8u[�f���d
b2�(�5��ݏ�v�����V��`�ؽ�9&�����ʵ��fׅ11 ���]:�V�ߧ�s`)�Y�z"�"�o�%��'AAҶ�}���5�庀��?�h!Èq}�A���l���2���Ъ�\��c�����[��U�	/��0~O֘�\D���T�<�����-%���Ki���R8^�l��#x�U�
W$ъ��6�P��)
�5���͹$9S���Oܞ.r��#d�E+:KiOg�k��~w �Q��aLF��.e�2r�'3�*f�I�ހ��Fw��׎C.��"��0Rk&F�[ġ�����%���k5���t{�oպ�z�k�+Qύ'˲���?�ʮ������l Y ��i�׶G�)��7��/���      �   x  x�m��n�0E��W�UW(�v�VM��Pi@!}I�X`B�(TNZ���iI�D%K�f<���Q��)��v>��Į����X~�%�mԧ��6eQ�kM��S¥e6X5{�rZj�X(h+%E�V��d��2C�uY|js@�S&׵��H�1<�l�Q}�Dxt'`sA��e�3��k�S��NU��1���l4�a����_~!�sDm6F�5Fಏ�Y�Mi�h�f���t6���H�0�-0�DZ�$�C�~g����o�;vۨG���&��?���x@"��q[��]���3�4'��g�t�ź4��w�n�}uz���Aaa06��w��cA�p��.���~��%�
+��mKH�A׆G��*��n~պ����z�o䀘            x������ � �      �   )  x��UMo�H<w~EI{،� 0��������f�!����%bv��4�mn����ɧv��d�_�WU��E�n���K�#�FG�ج�L��w�J����YnLg�x�Ԫ��r?5A�k��S�)�rkȍ9bŽB1po���x,}�x+-�7}5d��>6%�q������2�B]СTh� ��/wU�Y�
�f�t 9�Ǧ�,��VR�l�wJ�$}��t( ���� D~��5���+�M��r)S3Ϥ.��_KR��qH�0�����m�[V�]�����G��m׫�Tv��6zČJS5Ǣȥ,�J2O��0�fZ�])�e����ep�r�,v�0��r3�~���V;�
��L�2�*�Mj�5q��I1������%���D����ݼ�������,��hiꚛ2A��5��\�zg7feJ5������ b���@������U��:�F֐%.=}�Y��g��w�u�T��0��M`ᯟ�c���"�y&����219D$u����8Xr�<V�ϻ��~�p~�auh�WH�]�r����ຎ�q��mS}��5`A?�^���CS������穩���n ��	Iݞ ���\c�?��1�f~��� K���'�X�D�״���/��m���2�C��D9�7칸��&u�񋭭P��^������uG���{�5QT*d"�o���0��{��8�R��}Mi���"#�,���~+�R�����[�P+�Z$���ai{�%$T�
��������OÈ�A��yrM޲y広I�Sfw��ݸ�%H��K���)��b�����V��'��5]�̯ڇn�/JL��DdG��S�9��ms[O �6M{��q��e���=l���	F��'ao�/(�tH�
̌	A�����[~j�c�R�͂���m\$�.�ɔDRB�����Qc���;$��сN��N�֌�fG�D�݀��� ���Ѿ��Ֆ�軍�M���J1v��V8�H
b����vAɥ��tlλt��e�
�����QqZ�K	�Z�����o������~�_]]�{��X      �     x�M��n�H�ו�8�֌D3�ؙ���P�b
p�Vo��46���&�~�Y����̅��DBE��:u�w�(��y�&⋺qE�!E�UIRE)���<� U�DD��k3�����t��p2��D��)�i��4�0
��z%�j���4��E�P=��k�pf��Ν����6ݥ�e�W�О����p9>�56�g8�Ra�@����W�}����Ԝ�5��ۘ/o���6��~����y�-P�����=ՑG��1�ߊ���%���vؽ��_�3�]=<�Cy~a����z_O����u(#|`(���C�Z~���<4������<5;$������hY�J�2
�E���Pl�2�
�4�-��A��$$:�v�����Hu�L�o���G�=�u�(m8˥��[e�� ��R�Ti���r+rn��s��Xŝ��ש�m�?1נ��C}n{vM��b>_��׺�5�rh���j���W����6oi���vf"�����0R����3~~e9�-~�� �U|"$@[����k��K�HI^)!s�n�{��Pg�k>T�d�gV��:���u��dQq೑��fɘQ�(*�oH�kmB�3X~r�Bm���
��]���ͤT�X�����*N�D2NʱO�Pd�r7�~�����e�{��C��6'�����\w\:���'Q��2�0c�ki��T���\l���A���a
�͑�Oye`4�!C�r�Ci��T�\|���,צ���4m9�<d���x!����;��ʜȋ��(٣�����_{9-            x������ � �     